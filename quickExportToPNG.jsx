// 処理するフォルダを選択
var inputFolder = Folder.selectDialog("入力フォルダを選択してください");

// 出力フォルダを選択
var outputFolder = Folder.selectDialog("出力フォルダを選択してください");

if (inputFolder && outputFolder) {
  // フォルダ内のすべてのファイルを取得
  var files = inputFolder.getFiles(/\.(jpg|jpeg|png|tif|tiff|bmp|psd)$/i);

  for (var i = 0; i < files.length; i++) {
    var file = files[i];

    // ファイルが存在するかチェック
    if (file instanceof File) {
      // 画像を開く
      var doc = open(file);

      // クイック出力のオプションを設定
      var pngOptions = new PNGSaveOptions();
      pngOptions.compression = 9; // 圧縮レベル（0〜9）

      // 出力ファイルのパスを設定
      var outputFile = new File(
        outputFolder + "/" + doc.name.replace(/\.[^\.]+$/, "") + ".png"
      );

      // 画像をPNG形式で保存
      doc.saveAs(outputFile, pngOptions, true, Extension.LOWERCASE);

      // ドキュメントを閉じる
      doc.close(SaveOptions.DONOTSAVECHANGES);
    }
  }

  alert("処理が完了しました。");
} else {
  alert("フォルダが選択されていません。");
}
