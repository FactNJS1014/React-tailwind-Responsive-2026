function PdfPreview() {
  return (
    <div className="bg-gray-300 min-h-screen py-10">
      {/* toolbar */}
      <div className="flex justify-start mb-4 print:hidden p-6 container mx-auto">
        <button
          onClick={() => window.close()}
          className="bg-purple-600 text-white px-6 py-2 rounded-xl shadow"
        >
          Back to Home
        </button>
      </div>

      {/* A4 page */}
      <div className="a4-page mx-auto bg-white p-10 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>

        <p>
          <b>Name:</b> Natdanai Jansomboon
        </p>
        <p>
          <b>Position:</b> Web Developer (Software Engineer)
        </p>

        <hr className="my-4" />

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quod.
        </p>
      </div>
    </div>
  );
}

export default PdfPreview;
