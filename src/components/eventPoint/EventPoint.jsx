import React from "react";

const EventPoint = ({ svg, xScale, yScale, data }) => {
  console.log(data);
  const point = svg
    .selectAll(".myDot")
    .data(data)
    .join("rect") // Use "rect" instead of "circle"
    .attr("class", "myDot")
    .attr("width", 100) // Set the desired width for the rectangles
    .attr("height", 40) // Set the desired height for the rectangles
    .attr("fill", "red")
    .attr("x", (d) => xScale(d.x)) // Adjust the x position to center the rectangle
    .attr("y", (d) => yScale(d.y));
  svg
    .selectAll(".myText")
    .data(data)
    .join("text")
    .attr("class", "myText")
    .attr("x", (d) => xScale(d.x) + 10) // Adjust the x position to center the rectangle
    .attr("y", (d) => yScale(d.y) + 25)
    .attr("stroke", "#000")
    .text((d) => d.title);

  return point;
};

export default EventPoint;
