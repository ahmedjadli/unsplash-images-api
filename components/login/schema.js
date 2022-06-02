import * as Yup from "yup";

export default Yup.object().shape({
  username: Yup.string().required("veuillez entrer votre nom d'utilisateur"),
  password: Yup.string().required("Veuillez entrer votre mot de passe"),
});
