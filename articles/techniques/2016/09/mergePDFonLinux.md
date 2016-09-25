在 Linux 中将多个独立的 PDF 文档合并到一起
* 为了完成后面的操作，你需要事先在系统中安装好 Ghostscript 和 PDFtk 这两个软件： sudo apt-get install gs pdftk
* 打开终端，并粘贴下列命令： gs -dNOPAUSE -sDEVICE=pdfwrite -sOUTPUTFILE=firstANDsecond.pdf -dBATCH first.pdf second.pdf
	- 将 first.pdf 和 second.pdf 这两个 PDF 文档合并成 firstANDsecond.pdf 文件
