/* eslint-disable react/no-unescaped-entities */

import Login from "../components/login";
import verifyUser from "../lib/verifyUser";

const LoginPage = () => {
  return <Login />;
};

export async function getServerSideProps({ req, res }) {
  const user = await verifyUser(req, res);

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
}

export default LoginPage;
