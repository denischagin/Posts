import React, { useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MySelect from "./components/UI/select/MySelect";
import './styles/App.css'


function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Пайтон', body: 'Говно'},
    {id: 2, title: 'Пайтон', body: 'Хороший язык'},
    {id: 3, title: 'Пайтон', body: 'Плохой язык'},
  ])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
  

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <div>
          <MySelect  defaultValue='Сортировка' options={[
              {value: 'title', name: 'По названию'},
              {value: 'body', name: 'По описанию'},
          ]}/>
      </div>
      {posts.length === 0
      ? <h1 style={{textAlign: 'center'}}>Статьи про пайтон не найдены</h1>
      : <PostList posts={posts} remove={removePost} title='Посты про Пайтон' key={Date.now()}/>}
      
      
    </div>
    
  );
}

export default App;
