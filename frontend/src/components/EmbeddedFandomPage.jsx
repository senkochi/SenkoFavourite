const EmbeddedFandomPage = ({ title }) => {
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="w-full h-[90vh] border-2 rounded shadow">
      <iframe
        src={`https://senkosan.fandom.com/wiki/${encodedTitle}`}
        title={`Fandom - ${title}`}
        className="w-full h-full"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
};

export default EmbeddedFandomPage;