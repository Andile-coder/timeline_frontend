import React, { useEffect, useRef, useState } from "react";
import {
  select,
  line,
  curveCardinal,
  scaleUtc,
  axisBottom,
  scaleLinear,
  zoom,
  max,
  axisLeft,
  ZoomTransform,
  zoomTransform,
} from "d3";
import Chooser from "../../chooser/Chooser";
import { useDispatch } from "react-redux";
import { offCanvasActions } from "../../../../redux/slices/offCanvasSlice";

const TimelineChart = (props) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [currentZoomState, setCurrentZoomState] = useState();
  const [clickedDate, setClickedDate] = useState(null);
  const [coordinates, setCoordinates] = useState({ tempx: 0, tempy: 0 });
  const data = [
    // { x: new Date("2023-04-01"), y: 25 },
    // { x: new Date("2023-05-01"), y: 30 },
    // {
    //   x: new Date(
    //     "Wed Oct 13 2156 05:18:41 GMT+0200 (South Africa Standard Time)"
    //   ),
    //   y: 25,
    // },
    { x: new Date("2023-07-21T21:37"), y: 1 },
  ];
  let width = ref.current?.parentElement?.clientWidth || 2000;
  const height = 500 || 0;
  const marginBottom = 30;

  const handleGraphClick = (svg, ref, xScale) => {
    svg.on("click", (event) => {
      const svgNode = ref.current;
      if (svgNode) {
        const point = svgNode.createSVGPoint();
        const svgRect = svgNode.getBoundingClientRect();
        point.x = event.clientX;
        point.y = event.clientY;
        const { x } = point.matrixTransform(svgNode.getScreenCTM()?.inverse());
        const newDate = xScale.invert(x);
        console.log(newDate);

        setClickedDate(newDate);
        dispatch(offCanvasActions.updateDateEventDate("2023-07-15T21:04"));
        const circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );

        const tempx = event.clientX - svgRect.left;
        const tempy = event.clientY - svgRect.top;

        //screen coordinates not exact user values
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
      dispatch(offCanvasActions.showOffCanvas({ open: true }));
    });
  };

  useEffect(() => {
    const xScale = scaleUtc()
      .domain([new Date("1900-01-01"), new Date("2100-01-01")])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, max(data.map((date) => date.y))])
      .range([height - 10, 10]);
    // Declare the x (horizontal position) scale.
    const svg = select(ref.current)
      .attr("width", "100%")
      .attr("height", "100%"); //declare svg

    svg.selectAll(".x-axis").remove(); // Remove existing x-axis elements after zooming

    // Select all circles within the SVG and bind data to them
    const circles = svg.selectAll("circle.myDot").data(data);

    circles.attr("cx", (d) => xScale(d.x)).attr("cy", (d) => yScale(d.y));

    handleGraphClick(svg, ref, xScale);

    if (currentZoomState) {
      const newXScale = currentZoomState.rescaleX(xScale);
      const [start, end] = newXScale.domain();
      xScale.domain([start, end]);
    }

    //plot points
    svg
      .selectAll(".myDot")
      .data(data)
      .join("circle")
      .attr("class", "myDot")
      .attr("r", 4)
      .attr("fill", "orange")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y));

    svg
      .append("g")
      .attr("class", "x-axis") // Add a class to the x-axis group for easy removal
      .attr("transform", `translate(0,${height - marginBottom})`)
      .attr("color", "")
      .attr("stroke-width", 2.5)
      .call(axisBottom(xScale).ticks(30))
      .selectAll(".tick")
      .append("circle")
      .attr("class", "x-axis-dot")
      .attr("cx", (d) => xScale(d))
      .attr("cy", 0)
      .attr("r", 6)
      .attr("fill", "#9BABB8");
    svg.selectAll("line").remove(); //remove vertical line replaced by dots

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);

    //zoom behaviour
    const zoomBehavior = zoom()
      .scaleExtent([10, 10000000])
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
    <div style={{ height: "500px", display: "flex" }}>
      <svg ref={ref} style={{ margin: "auto" }}>
        {" "}
        {/* <rect width="100%" height="100%" /> */}
        <g className="y-axis" />
        {/* {data.map((d, i) => {
          console.log(d);
          return (
            <circle
              key={i}
              cx={xScale(d.x)}
              cy={yScale(d.y)}
              r={5}
              fill="steelblue"
            />
          );
        })} */}
      </svg>

      {coordinates.tempx !== 0 && coordinates.tempy !== 0 && (
        <div
          style={{
            position: "absolute",
            left: coordinates.tempx,
            top: coordinates.tempy,
          }}
        >
          {/* <Chooser /> */}
        </div>
      )}
    </div>
  );
};

export default TimelineChart;
