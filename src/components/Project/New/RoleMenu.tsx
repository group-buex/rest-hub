import React from "react";

interface RoleMenuProps {
  onChange: (e) => void;
}

const RoleMenu = ({ onChange }) => {
  return (
    <select
      id="role"
      className="rounded bg-transparent border"
      onChange={onChange}
    >
      <option value="admin" defaultChecked>
        admin
      </option>
      <option value="guest">guest</option>
    </select>
  );
};

export default RoleMenu;
