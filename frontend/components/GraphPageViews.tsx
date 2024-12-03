import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { PageView } from "@/shared/interfaces";

interface GraphPageViewsProps {
    data: PageView[];
}

export default function GraphPageViews({ data }: GraphPageViewsProps) {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        // Set up chart dimensions and margins
        const width = 928;
        const height = 300;
        const marginTop = 20;
        const marginRight = 30;
        const marginBottom = 30;
        const marginLeft = 40;

        // Parse date strings into Date objects if not already
        data.forEach(d => {
            // Ensure that each date is a valid Date object
            if (!(d.date instanceof Date)) {
                d.date = new Date(d.date);
            }
        });

        // Get the last 30 days' range for the x-axis
        const now = new Date();
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(now.getDate() - 30);

        // Generate all the dates in the last 30 days
        const allDates = d3.timeDays(thirtyDaysAgo, now); // Array of dates for the last 30 days

        // Create a map of the data with date as key
        const dataMap = new Map(data.map(d => [d.date.toISOString().split('T')[0], d.count])); // Use ISO string as key for exact matching

        // Merge data with all dates, filling missing dates with zero count
        const mergedData = allDates.map(date => {
            const dateString = date.toISOString().split('T')[0]; // Format the date to YYYY-MM-DD
            return {
                date: date,
                count: dataMap.has(dateString) ? dataMap.get(dateString) : 0 // Default to 0 if no data exists
            };
        });

        // Set up scales
        const x = d3.scaleUtc()
            .domain([thirtyDaysAgo, now]) // Set domain to the last 30 days
            .range([marginLeft, width - marginRight]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(mergedData, (d: { count: number }) => d.count) || 0])
            .nice()
            .range([height - marginBottom, marginTop]);

        // Set up the line generator
        const line = d3.line<PageView>()
            .x((d: { date: Date }) => x(d.date))
            .y((d: { count: number }) => y(d.count));

        // Create or update the SVG container
        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height].join(" "))
            .style("max-width", "100%")
            .style("height", "auto");

        // Add the x-axis with formatted ticks
        svg.selectAll(".x-axis").remove();
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .attr("class", "x-axis")
            .call(d3.axisBottom(x)
            .tickValues(mergedData.map((d: { date: Date }) => d.date)) // Use exact dates from mergedData
            .tickFormat(d3.timeFormat("%m/%d")) // Format the ticks as MM/DD
                .tickSizeOuter(0));

        // Add the y-axis
        svg.selectAll(".y-axis").remove();
        svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .attr("class", "y-axis")
        .call(d3.axisLeft(y).ticks(height / 40))
        .call(g => g.select(".domain").remove())  // Remove the axis domain
        .call(g => g.selectAll(".tick line").remove())  // Remove the vertical tick marks
        .call(g => g.selectAll(".tick text")  // Keep the tick labels
            .style("text-anchor", "middle"))
        .call(g => g.selectAll(".tick")  // Append horizontal grid lines
            .append("line")
            .attr("x1", 0)  // Start the line at x=0 (left side)
            .attr("x2", width - marginLeft - marginRight)  // End the line at the full width
            .attr("stroke", "#ccc")  // Set a light color for the grid lines
            .attr("stroke-opacity", 0.4));  // Adjust opacity for the grid lines
    
    
        // Append the line path
        svg.selectAll("path.line").remove();
        svg.append("path")
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 1.5)
            .attr("d", line(mergedData)); // Use the merged data with zeros for missing dates
        // Add circles for each data point (scatter plot)
   // Add circles for each data point (scatter plot)

   let tooltip = d3.select(".tooltip");
   if (tooltip.empty()) {
       tooltip = d3.select("body")
           .append("div")
           .attr("class", "tooltip_pv")
           .style("position", "absolute")
           .style("visibility", "hidden")
           .style("background-color", "#fff")
           .style("border", "1px solid #ccc")
           .style("border-radius", "4px")
           .style("padding", "8px")
           .style("box-shadow", "0 0 10px rgba(0, 0, 0, 0.2)");
   }


   const circles = svg.selectAll(".data-point")
    .data(mergedData)
    .enter()
    .append("circle")
    .attr("class", "data-point")
    .attr("cx", (d: { date: Date }) => x(d.date))
    .attr("cy", (d: { count: number }) => y(d.count))
    .attr("r", 5) // Radius of the circle
    .attr("fill", "blue")
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .on("mouseover", function(this: SVGCircleElement, event: MouseEvent, d: PageView) {
        tooltip.style("visibility", "visible")
            .html(`Date: ${d3.timeFormat("%m/%d")(d.date)}<br>Page Views: ${d.count}`);
        d3.select(this)
            .attr("stroke", "orange") // Change stroke to fuchsia on hover
            .attr("stroke-width", 4); // Optionally, increase the stroke width
        })
        .on("mousemove", function(this: SVGCircleElement, event: MouseEvent) {
            tooltip.style("top", (event.pageY + 5) + "px")
                .style("left", (event.pageX + 5) + "px");
        })
        .on("mouseout", function(this: SVGCircleElement) {
            tooltip.style("visibility", "hidden");
            d3.select(this)
                .attr("stroke", "white") // Revert stroke color
                .attr("stroke-width", 1); // Revert stroke width
        });


    svg.selectAll(".x-axis, .y-axis")
    .call(g => g.lower()); // Push axes to the back

    }, [data]); // Re-run the effect when data changes

    return (
        <div className="p-10 shadow bg-white rounded-xl">
            <h2 className="text-lg font-bold mb-4">Page Views</h2>
            <svg ref={svgRef} className="w-full h-auto" />
        </div>
    )
}