import React from "react";

const EventPoint = ({ svg, xScale, yScale, data, color, eventType }) => {
  // Select all circles within the SVG and bind data to them
  const circles = svg.selectAll(`circle.${eventType}`).data(data);

  circles.attr("cx", (d) => xScale(d.x)).attr("cy", (d) => yScale(d.y));
  const point = svg
    .selectAll(`.${eventType}`)
    .data(data)
    .join("rect") // Use "rect" instead of "circle"
    .attr("class", `${eventType}`)
    .attr("width", 100) // Set the desired width for the rectangles
    .attr("height", 40) // Set the desired height for the rectangles
    .attr("fill", color)
    .attr("x", (d) => xScale(d.x)) // Adjust the x position to center the rectangle
    .attr("y", (d) => yScale(d.y));
  svg
    .selectAll(`.${eventType}Text`)
    .data(data)
    .join("text")
    .attr("class", `${eventType}Text`)
    .attr("x", (d) => xScale(d.x) + 10) // Adjust the x position to center the rectangle
    .attr("y", (d) => yScale(d.y) + 25)
    .attr("stroke", "#000")
    .text((d) => d.title);

  return point;
};

export default EventPoint;
