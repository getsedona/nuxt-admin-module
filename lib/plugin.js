export default async function({ app, store }) {
  app.head.link.push({
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Material+Icons"
  });
}
