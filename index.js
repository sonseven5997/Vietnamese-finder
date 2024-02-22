import fs from "fs";
import path from "path";

const regex =
  /[àÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬđĐèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆìÌỉỈĩĨíÍịỊòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰỳỲỷỶỹỸýÝỵỴ]+/gim;

function getAllFiles(dirPath, arrayOfFiles) {
  arrayOfFiles = arrayOfFiles || [];

  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles.filter((file) => {
    return file.endsWith(".ts") || file.endsWith(".tsx");
  });
}

function fileContentMatchesRegex(filePath, regex) {
  const content = fs.readFileSync(filePath, "utf8");
  return regex.test(content);
}

const main = () => {
  const folderPath = "/Applications/happytime/mobile/src/"; // change this
  const filesArray = getAllFiles(folderPath);
  const filteredFiles = filesArray.filter((file) => {
    return fileContentMatchesRegex(file, regex);
  });
  console.log(filteredFiles);
};

main();
