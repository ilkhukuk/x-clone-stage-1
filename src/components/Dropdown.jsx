const Dropdown = ({ handleDelete, handleEdit }) => {
  return (
    <>
      <label class="popup">
        <input type="checkbox" />
        <div class="burger" tabindex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav class="popup-window">
          <legend>Actions</legend>
          <ul>
            <li>
              <button onClick={handleEdit}>
                <svg
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="14"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
                </svg>
                <span>Edit</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={handleDelete}>
                <svg
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="14"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line y2="18" x2="6" y1="6" x1="18"></line>
                  <line y2="18" x2="18" y1="6" x1="6"></line>
                </svg>
                <span>Delete</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
    </>
  );
};

export default Dropdown;