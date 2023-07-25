import React, { useEffect, useRef, useState } from "react";
import {
  select,
  scaleUtc,
  axisBottom,
  scaleLinear,
  zoom,
  axisLeft,
  zoomTransform,
} from "d3";
import { useDispatch, useSelector } from "react-redux";
import { offCanvasActions } from "../../../../redux/slices/offCanvasSlice";
import EventPoint from "../../eventPoint/EventPoint";

const TimelineChart = ({ eventsData, unSavedEventsData }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [currentZoomState, setCurrentZoomState] = useState();
  const [clickedDate, setClickedDate] = useState({ x: null, y: null });
  const [coordinates, setCoordinates] = useState({ tempx: 0, tempy: 0 });

  let unSavedEvents = [];
  let savedEvents = [];
  useEffect(() => {
    //check how many events in each day and adjust y_axis

    let eventsLength = {};
    eventsData.forEach((event) => {
      eventsLength = {
        ...eventsLength,
        [event.event_date]: {
          max: eventsData.filter((e) => e.event_date === event.event_date)
            .length,
          count: 0,
        },
      };
    });

    savedEvents = eventsData.map((event, index) => {
      const newEvent = {
        x: new Date(event.event_date),
        y: 20 + eventsLength[`${event.event_date}`].count * 10,
        title: event.title,
      };
      eventsLength[`${event.event_date}`].count++;
      return newEvent;
    });

    unSavedEvents = unSavedEventsData.map((event) => ({
      x: new Date(event.event_date),
      y: event.y_axis,
      title: event.title,
    }));
  });

  let width = ref.current?.parentElement?.clientWidth || 2000;
  const height = 500 || 0;
  const marginBottom = 30;

  const handleGraphClick = (svg, ref, xScale, yScale) => {
    svg.on("click", (event) => {
      const svgNode = ref.current;
      if (svgNode) {
        const point = svgNode.createSVGPoint();
        const svgRect = svgNode.getBoundingClientRect();
        point.x = event.clientX;
        point.y = event.clientY;
        const { x, y } = point.matrixTransform(
          svgNode.getScreenCTM()?.inverse()
        );
        const newDate = xScale.invert(x);
        const formattedDate = newDate.toISOString().slice(0, 16);

        const y_coordinate = yScale.invert(y);

        //format date to suit html input date type

        //update clicked date
        setClickedDate({ x: newDate, y: y_coordinate });
        //update offcanvas coordinates
        dispatch(
          offCanvasActions.updateEventCoordinates({
            x: formattedDate,
            y: y_coordinate,
          })
        );

        //create circle to show when you click
        const circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );

        const tempx = event.clientX - svgRect.left;
        const tempy = event.clientY - svgRect.top;

        //adjust where the user click to match the graph coordinates
        setCoordinates({
          tempx: tempx + window.screenX,
          tempy: tempy + window.screenY,
        });

        circle.setAttribute("cx", tempx);
        circle.setAttribute("cy", tempy);
        circle.setAttribute("r", "5");
        circle.setAttribute("fill", "red");

        // Append the circle to the SVG element
        //uncomment  line below to see circle where user clicked
        // svgNode.appendChild(circle);
      }
      dispatch(offCanvasActions.showOffCanvas({ open: true }));
    });
  };

  useEffect(() => {
    const xScale = scaleUtc()
      .domain([new Date("2000-01-01"), new Date("2070-01-01")])
      .range([0, width]);

    const yScale = scaleLinear()
      .domain([0, 100])
      .range([height - 10, 10]);

    // Declare the x (horizontal position) scale.
    const svg = select(ref.current)
      .attr("width", "100%")
      .attr("height", "100%"); //declare svg

    svg.selectAll(".x-axis").remove(); // Remove existing x-axis elements after zooming

    //plot points
    console.log("saved", savedEvents);

    handleGraphClick(svg, ref, xScale, yScale);

    if (currentZoomState) {
      const newXScale = currentZoomState.rescaleX(xScale);
      const [start, end] = newXScale.domain();
      xScale.domain([start, end]);
    }
    EventPoint({
      svg,
      xScale,
      data: unSavedEvents,
      yScale,
      color: "gray",
      eventType: "draft",
    }); //unsaved events
    EventPoint({
      svg,
      xScale,
      data: savedEvents,
      yScale,
      color: "green",
      eventType: "saved",
    }); //saved events
    //create x-axis
    svg
      .append("g")
      .attr("class", "x-axis") // Add a class to the x-axis group for easy removal
      .attr("transform", `translate(0,${height - marginBottom})`)
      .attr("color", "")
      .attr("stroke-width", 3)
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
      .scaleExtent([1, 700000])
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
//18 July 2023
//id=2023071800
//id=2023071801
//img=202307180100

//registered user should update timeline with events
//registered user can only edit their own events
//unregistered user can only view approved events
//admin can approve events, view all events, update event status
//allow admin to filter by status
//once approved by admin then registered user cannot edit
