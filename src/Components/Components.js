import styled from "styled-components"

const seeMoreStyle = {
  backgroundColor: "transparent",
  color: "var(--default-bg-color)",
  border: "none",
  padding: "2px",
  fontSize: "16px",
  cursor: "pointer",
  textAlign: "left",
}

export const SeeMoreButton = ({ onClick, seeMore }) => (
  <button style={seeMoreStyle} onClick={onClick}>
    {seeMore ? "See Less" : "See More"}
  </button>
)
