import React, { useMemo, useState } from "react";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/MyModal/MyModal";
import './styles/App.css'


function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'Python', body: 'Говно'},
    {id: 2, title: 'Js', body: 'Отличный язык'},
    {id: 3, title: 'PHP', body: 'Плохой язык'},
    {id: 4, title: 'Ruby', body: 'Что это'},
    {id: 5, title: 'Java', body: 'Говно'},
    {id: 6, title: 'C++', body: 'Сложный язык'},
    {id: 7, title: 'C#', body: 'Нормальный язык'},
  ])

  const [filter, setFilter] = useState({sort: '', query: ''})

  const [modal, setModal] = useState(false)

  const createPost = (newPost) => {
      setPosts([...posts, newPost])
      setModal(false)}


  
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  } 
  
  
  const sortedPosts = useMemo(() => {
    console.log('Отработала')
    if (filter.sort) {
      return [...posts].sort ((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    } 
    return posts;
  }, [filter.sort, posts])

  const sortedAndSearchPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])
 
 

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost}/>
      </MyModal>
      
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter}/>
      {sortedAndSearchPosts.length === 0
      ? <h1 style={{textAlign: 'center'}}>Статьи про языки программирования не найдены</h1>
      : <PostList posts={sortedAndSearchPosts} remove={removePost} title='Посты про языки программирования' key={Date.now()}/>}
      
      
    </div>
    
  );
}

export default App;
