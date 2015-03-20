function ErrorAnnotation(editor, line, col, content)
{
	this.opened = false;
	this.line = line;
	this.col = col;
	this.content = content;
	this.editor = editor;
	this.errorMark = null;
	this.lineWidget = null;
	this.init();
	this.open();
}

ErrorAnnotation.prototype.init = function()
{
	var separators = [' ', '\\\+', '-', ';', '\\\(', '\\\{',  '\\\}', '\\\)', '\\*', '/', ':', '\\\?'];
	var errorPart = editor.getLine(this.line).substring(this.col);
	var incrMark = this.col + errorPart.split(new RegExp(separators.join('|'), 'g'))[0].length;
	if (incrMark === this.col)
		incrMark = this.col + 1;
	this.errorMark = editor.markText({ line: this.line, ch: this.col }, { line: this.line, ch: incrMark }, { className: "CodeMirror-errorannotation", inclusiveRight: true });
}

ErrorAnnotation.prototype.open = function()
{
	var node = document.createElement("div");
	node.id = "annotation"
	node.innerHTML = this.content;
	node.className = "CodeMirror-errorannotation-context"
	this.lineWidget = this.editor.addLineWidget(this.errorMark.find().from.line, node, { coverGutter: true });
	this.opened = true;
}

ErrorAnnotation.prototype.close = function()
{
	this.lineWidget.clear();
	this.opened = false;
}

ErrorAnnotation.prototype.detroy = function()
{
	if (this.opened)
		this.close();
	if (this.errorMark)
		this.errorMark.clear();
}
