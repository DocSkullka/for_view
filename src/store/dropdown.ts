export default {
  state: {
    dropdownId: null,
  },
  reducers: {
    setDropdownId(state, payload) {
      return { ...state, dropdownId: payload };
    },
  },
};
