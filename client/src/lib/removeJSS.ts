export default function removeJSS() {
  const jssStyles = document.querySelector("#jss-server-side");
  if (jssStyles) jssStyles.parentElement!.removeChild(jssStyles);
}
