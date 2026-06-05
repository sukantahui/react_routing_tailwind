
function Subject() {
  return (
    <>
    <form className="flex w-full align-center">
      <div class="border absolute h-80 w-90 ">
        <div>
          <label htmlFor="">Subject Name</label>
          <input type="text"/>
        </div>
        <div>
          <label htmlFor="">Subject Code</label>
          <input type="text"/>
        </div>
        <div>
          <label htmlFor="">Description</label>
          <input type="text"/>
        </div>
      </div>
    </form>
    </>
  );
}

export default Subject;