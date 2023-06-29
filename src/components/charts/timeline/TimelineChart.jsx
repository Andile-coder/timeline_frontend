import React, { useEffect, useRef, useState } from "react";
import {
  select,
  line,
  curveCardinal,
  scaleUtc,
  axisBottom,
  zoom,
  ZoomTransform,
  zoomTransform,
} from "d3";
import Chooser from "../../chooser/Chooser";

const TimelineChart = (props) => {
  const ref = useRef();
  const [currentZoomState, setCurrentZoomState] = useState();
  const [clickedDate, setClickedDate] = useState(null);
  const [coordinates, setCoordinates] = useState({ tempx: 0, tempy: 0 });
  const data = [
    { x: 0, y: 10 },
    { x: 1, y: 20 },
    { x: 2, y: 15 },
    { x: 3, y: 25 },
    { x: 4, y: 30 },
  ];
  let width = ref.current?.parentElement?.clientWidth || 0;

  useEffect(() => {
    width = ref.current?.parentElement?.clientWidth || 0;
    const height = 400 || 0;
    const marginTop = 20;
    const marginRight = 40;
    const marginBottom = 30;
    const marginLeft = 40;

    // Declare the x (horizontal position) scale.
    const xScale = scaleUtc()
      .domain([new Date("1900-01-01"), new Date("2200-01-01")])
      .range([0, width]);
    const svg = select(ref.current)
      .attr("width", "100%")
      .attr("height", height);
    svg.selectAll(".x-axis").remove(); // Remove existing x-axis elements

    svg.on("click", (event) => {
      const svgNode = ref.current;
      if (svgNode) {
        const point = svgNode.createSVGPoint();
        const svgRect = svgNode.getBoundingClientRect();
        point.x = event.clientX;
        point.y = event.clientY;
        const { x } = point.matrixTransform(svgNode.getScreenCTM()?.inverse());
        const clickedDate = xScale.invert(x);
        console.log(clickedDate);
        console.log(point.x);
        console.log(point.y);
        setClickedDate(clickedDate);
        const circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );

        const tempx = event.clientX - svgRect.left;
        const tempy = event.clientY - svgRect.top;

        setCoordinates({
          tempx: tempx + window.screenX,
          tempy: tempy + window.screenY,
        });
        circle.setAttribute("cx", tempx);
        circle.setAttribute("cy", tempy);
        circle.setAttribute("r", "5");
        circle.setAttribute("fill", "red");

        // Append the circle to the SVG element
        svgNode.appendChild(circle);
      }
    });
    if (currentZoomState) {
      const newXScale = currentZoomState.rescaleX(xScale);
      const [start, end] = newXScale.domain();
      xScale.domain([start, end]);

      svg
        .append("g")
        .attr("class", "x-axis") // Add a class to the x-axis group for easy removal
        .attr("transform", `translate(0,${height - marginBottom})`)
        .attr("color", "")
        .call(axisBottom(newXScale).ticks(50))
        .selectAll(".tick")
        .append("circle")
        .attr("class", "x-axis-dot")
        .attr("cx", (d) => xScale(d))
        .attr("cy", 0)
        .attr("r", 6)
        .attr("fill", "#9BABB8");

      svg.selectAll("line").remove();
    } else {
      svg
        .append("g")
        .attr("class", "x-axis") // Add a class to the x-axis group for easy removal
        .attr("transform", `translate(0,${height - marginBottom})`)
        .attr("color", "")
        .call(axisBottom(xScale).ticks(50))
        .selectAll(".tick")
        .append("circle")
        .attr("class", "x-axis-dot")
        .attr("cx", (d) => xScale(d))
        .attr("cy", 0)
        .attr("r", 6)
        .attr("fill", "#9BABB8");

      svg.selectAll("line").remove();
    }

    const zoomBehavior = zoom()
      .scaleExtent([0, 100])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", () => {
        const zoomState = zoomTransform(svg.node());
        setCurrentZoomState(zoomState);
      });
    svg.call(zoomBehavior);
  }, [currentZoomState]);

  return (
    <div>
      <svg ref={ref}>{/* Render your chart elements here */}</svg>

      {coordinates.tempx !== 0 && coordinates.tempy !== 0 && (
        <div
          style={{
            position: "absolute",
            left: coordinates.tempx,
            top: coordinates.tempy,
          }}
        >
          <Chooser />
        </div>
      )}
    </div>
  );
};

export default TimelineChart;
