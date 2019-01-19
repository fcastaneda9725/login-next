// import withRedux from 'next-redux-wrapper';
import { connect } from 'react-redux';
import { initStore } from '../redux';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';

// const Index = () => (
//   <Layout title="Home">
//     <h2 className="title is-2">Authentication with Next.js and JWT</h2>
//     <img src="/static/nextjs.jpg" />
//     <p>A proof of concept app, demonstrating the authentication of Next.js application using JWT.</p>
//   </Layout>
// );

const Index = () => 
<Layout title="Home">
     <h2 className="title is-2">Authentication with Next.js and JWT</h2>
    <img src="/static/nextjs.jpg" />
    <p>A proof of concept app, demonstrating the authentication of Next.js application using JWT.</p>
</Layout>

Index.getInitialProps = ({store}) => {
    store.dispatch({type: 'FOO', payload: 'foo'}); // component will be able to read from store's state when rendered
        return {custom: 'custom'};
  };
  
  export default connect()(Index)