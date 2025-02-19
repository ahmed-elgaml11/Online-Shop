const {
	ClassicEditor,
	Autosave,
	BlockQuote,
	Bold,
	Essentials,
	Heading,
	ImageBlock,
	ImageInline,
	ImageResize,
	ImageToolbar,
	Indent,
	IndentBlock,
	Italic,
	Link,
	Paragraph,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextPartLanguage,
	Title,
	Underline,
	WordCount
} = window.CKEDITOR;

const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzEzNzI3OTksImp0aSI6ImJmMzMwMzY1LWRmMzYtNGVmYS04YmUwLTVkNzQyYzFmYmRiOCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiXSwiZmVhdHVyZXMiOlsiRFJVUCJdLCJ2YyI6ImRlMzVkMGQxIn0.wyPKmf-rxC2RDv375ih8ylmPu1VJspjOzOegpyCtdcnAYvwmvP6jrLG2f2nym6Vs4TA7LKXKd6m2symxz0DwyQ';

const editorConfig = {
	toolbar: {
		items: [
			'textPartLanguage',
			'|',
			'heading',
			'|',
			'bold',
			'italic',
			'underline',
			'|',
			'link',
			'insertTable',
			'blockQuote',
			'|',
			'outdent',
			'indent'
		],
		shouldNotGroupWhenFull: false
	},
	plugins: [
		Autosave,
		BlockQuote,
		Bold,
		Essentials,
		Heading,
		ImageBlock,
		ImageInline,
		ImageResize,
		ImageToolbar,
		Indent,
		IndentBlock,
		Italic,
		Link,
		Paragraph,
		Table,
		TableCaption,
		TableCellProperties,
		TableColumnResize,
		TableProperties,
		TableToolbar,
		TextPartLanguage,
		Title,
		Underline,
		WordCount
	],
	heading: {
		options: [
			{
				model: 'paragraph',
				title: 'Paragraph',
				class: 'ck-heading_paragraph'
			},
			{
				model: 'heading1',
				view: 'h1',
				title: 'Heading 1',
				class: 'ck-heading_heading1'
			},
			{
				model: 'heading2',
				view: 'h2',
				title: 'Heading 2',
				class: 'ck-heading_heading2'
			},
			{
				model: 'heading3',
				view: 'h3',
				title: 'Heading 3',
				class: 'ck-heading_heading3'
			},
			{
				model: 'heading4',
				view: 'h4',
				title: 'Heading 4',
				class: 'ck-heading_heading4'
			},
			{
				model: 'heading5',
				view: 'h5',
				title: 'Heading 5',
				class: 'ck-heading_heading5'
			},
			{
				model: 'heading6',
				view: 'h6',
				title: 'Heading 6',
				class: 'ck-heading_heading6'
			}
		]
	},
	image: {
		toolbar: ['imageTextAlternative', '|', 'resizeImage']
	},
	licenseKey: LICENSE_KEY,
	link: {
		addTargetToExternalLinks: true,
		defaultProtocol: 'https://',
		decorators: {
			toggleDownloadable: {
				mode: 'manual',
				label: 'Downloadable',
				attributes: {
					download: 'file'
				}
			}
		}
	},
	placeholder: 'Type or paste your content here!',
	table: {
		contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
	}
};

ClassicEditor.create(document.querySelector('#content'), editorConfig).then(editor => {
	return editor;
});
