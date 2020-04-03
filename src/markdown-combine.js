const fs = require("fs");
const util = require("util");
const path = require("path");
const logger = require("./logger.js");
const beautifyImages = require("./beautify-image-paths.js");

const [readFile, writeFile, exists] = [fs.readFile, fs.writeFile, fs.exists].map(fn =>
  util.promisify(fn),
);

//const combineMarkdowns = ({ contents, pathToStatic, mainMdFilename }) => async links => {
const combineMarkdowns = ({ contents, pathToStatic, mainMdFilename, pathToDocsifyEntryPoint }) => async links => {
  try {

    const files = await Promise.all(
      await links.map(async filename => {
	logger.err('>>>>>>>>>>>>>> oi '+filename);
        const fileExist = await exists(filename);

	logger.err('>>>>>>>>>>>>>> oi .1 '+filename);
        if (fileExist) {
	logger.err('>>>>>>>>>>>>>> oi .2 '+filename);
          const content = await readFile(filename, {
            encoding: "utf8",
          });

          return {
            content,
            name: filename,
          };
        }
	logger.err('>>>>>>>>>>>>>> oi .3 '+filename);

        throw new Error(`file ${filename} is not exist, but listed in ${contents}`);
      }),
    );
	logger.err('>>>>>>>>>>>>>> oi 25');
//    const resultFilePath = path.resolve(pathToStatic, mainMdFilename);
      const resultFilePath = path.resolve(pathToDocsifyEntryPoint, pathToStatic, mainMdFilename);
	logger.err('>>>>>>>>>>>>>> oi 31');

    try {
	logger.err('>>>>>>>>>>>>>> oi 32');
      const content = files
        .map(({ content, name }) => beautifyImages({ pathToDocsifyEntryPoint, pathToStatic })(content, name))
        .join("\n\n\n\n");
      await writeFile(resultFilePath, content);
    } catch (e) {
	logger.err('>>>>>>>>>>>>>> oi 4');
      logger.err(e);
      throw e;
    }

    return resultFilePath;
  } catch (err) {
    logger.err("combineMarkdowns", err);
    throw err;
  }
};

module.exports = config => ({
  combineMarkdowns: combineMarkdowns(config),
});
