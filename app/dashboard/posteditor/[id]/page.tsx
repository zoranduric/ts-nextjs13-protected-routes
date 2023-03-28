'use client';
type fetchPost = {
  title: string;
  content: string;
  published: boolean;
};

import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import axios from 'axios';
//import { EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { useState } from 'react';
//import { ContentState, Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const BrandNewEditor = ({ params }: { params: { id: string } }) => {
  const [title, setTitle] = useState('');
  const [editorstate, setEditorState] = useState(EditorState.createEmpty());
  const [published, setPublished] = useState(false);

  // fetch post from api and set the editorstate to the post content
  const getPostValue = async () => {
    const post = await axios.get(`/api/getPost`, {
      params: { id: params.id },
    });

    if (post.data.post) {
      const { title, content, published } = post.data.post as fetchPost;
      setTitle(title);
      setPublished(published);
      const contentBlock = htmlToDraft(content);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
      return;
    } else {
      console.log('post not found');
      return;
    }
  };

  function handlePublishedChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPublished(e.target.value === 'published');
  }

  if (params.id && title === '') {
    getPostValue();
  }

  return (
    <div>
      <h2>Brand new blog post editor ☄️</h2>
      <label>Blog title</label>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      ></input>
      <div>
        <label>
          <input
            type='radio'
            name='published'
            value='draft'
            checked={!published}
            onChange={handlePublishedChange}
          />
          Draft
        </label>
        <label>
          <input
            type='radio'
            name='published'
            value='published'
            checked={published}
            onChange={handlePublishedChange}
          />
          Published
        </label>
      </div>
      <Editor
        editorState={editorstate}
        wrapperClassName='rich-editor demo-wrapper'
        editorClassName='demo-editor'
        onEditorStateChange={setEditorState}
        placeholder='The message goes here...'
      />

      <br />
      <button>Publish post</button>
    </div>
  );
};

export default BrandNewEditor;
