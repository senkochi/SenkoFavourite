import React, { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const BlogEditor = ({ value = '', onChange, placeholder = 'Start writing your blog post...', onSave }) => {
  const editorRef = useRef(null);

  // Cập nhật nội dung khi value thay đổi từ component cha
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getContent()) {
      editorRef.current.setContent(value);
    }
  }, [value]);

  // Xử lý thay đổi nội dung
  const handleEditorChange = (content) => {
    if (onChange) {
      onChange(content);
    }
  };

  // Hàm lưu bài viết
  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      console.log('Nội dung editor:', content);
      if (onSave) {
        onSave(content);
      }
    }
  };

  return (
    <div className="bg-white">
      <Editor
        apiKey='57dryakwf65al4ddtyq7v7frybdk5w17zzb0uqftu8fda11y'
        onInit={(evt, editor) => editorRef.current = editor}
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          height: 600,
          menubar: 'file edit view insert format tools table help',
          
          // Plugins mở rộng cho nhiều tính năng như Notion
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'paste', 'code', 'help', 'wordcount',
            'emoticons', 'template', 'codesample', 'hr', 'pagebreak', 'nonbreaking',
            'toc', 'imagetools', 'textpattern', 'noneditable', 'quickbars',
            'accordion', 'checklist'
          ],
          
          // Toolbar nổi (quickbars) khi chọn text
          quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          quickbars_insert_toolbar: 'quickimage quicktable',
          
          // Cấu hình nội dung
          content_style: `
  body { 
    font-family: "Poppins", sans-serif !important;
    font-size: 16px;
    line-height: 1.6;
    color: #374151;
    max-width: none;
    padding: 1rem;
    margin: 0;
  }
  * {
    font-family: "Poppins", sans-serif !important;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: "Poppins", sans-serif !important;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
    line-height: 1.25;
  }
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }
  p { 
    font-family: "Poppins", sans-serif !important;
    margin-bottom: 1rem; 
  }
  blockquote {
    font-family: "Poppins", sans-serif !important;
    border-left: 4px solid #e5e7eb;
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: #6b7280;
  }
  code {
    background-color: #f3f4f6;
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: "Poppins", sans-serif !important;
  }
  pre {
    background-color: #1f2937;
    color: #f9fafb;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    font-family: "Poppins", sans-serif !important;
  }
  table {
    font-family: "Poppins", sans-serif !important;
    border-collapse: collapse;
    width: 100%;
    margin: 1rem 0;
  }
  table th, table td {
    font-family: "Poppins", sans-serif !important;
    border: 1px solid #e5e7eb;
    padding: 0.75rem;
    text-align: left;
  }
  table th {
    background-color: #f9fafb;
    font-weight: 600;
  }
  ul, ol, li {
    font-family: "Poppins", sans-serif !important;
  }
  .mce-content-body .checklist {
    list-style-type: none;
    padding-left: 0;
  }
  .mce-content-body .checklist li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
  }
  /* Fix placeholder alignment */
  .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
    color: #9ca3af;
    font-family: "Poppins", sans-serif !important;
    font-style: normal;
    position: relative;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
  }
`,

// Và sửa lại toolbar để loại bỏ fontfamily
toolbar: [
  'undo redo | blocks fontsize | bold italic underline strikethrough',
  'alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist checklist',
  'forecolor backcolor removeformat | charmap emoticons | fullscreen preview print',
  'insertfile image media template link anchor codesample | ltr rtl | toc accordion'
].join(' | '),

// Thêm cấu hình để disable font family
font_family_formats: 'Poppins="Poppins", sans-serif',
          
          // Cấu hình placeholder
          placeholder: placeholder,
          
          // Cấu hình upload ảnh
          images_upload_handler: (blobInfo, success, failure, progress) => {
            // TODO: Implement image upload to your server
            // For now, we'll create a data URL
            const reader = new FileReader();
            reader.onload = function() {
              success(reader.result);
            };
            reader.readAsDataURL(blobInfo.blob());
          },
          
          // Cấu hình paste
          paste_auto_cleanup_on_paste: true,
          paste_remove_styles: false,
          paste_remove_styles_if_webkit: false,
          paste_strip_class_attributes: 'none',
          
          // Auto-resize
          resize: 'both',
          min_height: 400,
          max_height: 800,
          
          // Templates cho nội dung có sẵn
          templates: [
            {
              title: 'Blog Post Template',
              description: 'Basic blog post structure',
              content: `
                <h1>Blog Title</h1>
                <p><em>Introduction paragraph...</em></p>
                <h2>Main Section</h2>
                <p>Your content here...</p>
                <h2>Conclusion</h2>
                <p>Wrap up your thoughts...</p>
              `
            },
            {
              title: 'Tutorial Template',
              description: 'Step-by-step tutorial',
              content: `
                <h1>How to: Tutorial Title</h1>
                <p><strong>What you'll learn:</strong></p>
                <ul>
                  <li>Point 1</li>
                  <li>Point 2</li>
                  <li>Point 3</li>
                </ul>
                <h2>Step 1</h2>
                <p>Instructions...</p>
                <h2>Step 2</h2>
                <p>Instructions...</p>
                <h2>Conclusion</h2>
                <p>Summary...</p>
              `
            }
          ],
          
          // Text patterns for quick formatting (như Notion)
          textpattern_patterns: [
            {start: '*', end: '*', format: 'italic'},
            {start: '**', end: '**', format: 'bold'},
            {start: '#', format: 'h1'},
            {start: '##', format: 'h2'},
            {start: '###', format: 'h3'},
            {start: '####', format: 'h4'},
            {start: '#####', format: 'h5'},
            {start: '######', format: 'h6'},
            {start: '>', format: 'blockquote'},
            {start: '---', replacement: '<hr/>'},
            {start: '--', replacement: '—'},
            {start: '-', cmd: 'InsertUnorderedList'},
            {start: '1.', cmd: 'InsertOrderedList'}
          ],
          
          // Spell checker
          browser_spellcheck: true,
          
          // Context menu
          contextmenu: 'link image table configurepermanentpen',
          
          // Advanced options
          extended_valid_elements: 'script[src|async|defer|type|charset]',
          custom_undo_redo_levels: 10,
          
          // Performance
          convert_urls: false,
          relative_urls: false,
          
          // Mobile responsive
          mobile: {
            theme: 'silver'
          }
        }}
      />
      
      {/* Save button nếu cần */}
      {onSave && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Save Content
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;