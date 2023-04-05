import Link from "next/link";
import { useSelector } from "react-redux";
import { addPosts } from "../store/postsSlice";
import { wrapper } from "../store/store";

const Index = (props) => {
  const { posts } = useSelector((state) => state.posts);

  const link =
    posts.length < 1 ? "/storeposts?store=false" : "/storeposts?store=true";

  return (
    <div>
      <h1>POST FROM BACKEND</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ))}

      <Link href={link}>
        <a>Navigate</a>
      </Link>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const response = await (
      await fetch(`https://jsonplaceholder.typicode.com/posts`)
    ).json();

    store.dispatch(addPosts(response));
  }
);

export default Index;
