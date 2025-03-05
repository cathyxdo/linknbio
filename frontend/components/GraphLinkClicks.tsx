import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { LinkClicks } from "@/shared/interfaces";

interface LinkClicksProps {
    data: LinkClicks;
}
export default function GraphLinkClicks({ data }: LinkClicksProps) {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [totalClicks, setTotalClicks] = useState<number>(0);
    const [showGraph, setShowGraph] = useState(false);

    useEffect(() => {
        if (!data ) return;

        // Sum total clicks
        const total = data.clicks.reduce((sum, click) => sum + click.count, 0);
        setTotalClicks(total);

        // Set chart dimensions and margins
        const width = 928;
        const height = 200;
        const marginTop = 20;
        const marginRight = 30;
        const marginBottom = 30;
        const marginLeft = 40;

        // Define date range (last 30 days)
        const now = new Date();
        const thirtyDaysAgo = d3.timeDay.offset(now, -30);
        const allDates = d3.timeDays(thirtyDaysAgo, now);

        // Map data to date counts
        const dataMap = new Map(
            data.clicks.map(d => [
                new Date(d.date).toISOString().split("T")[0],
                d.count
            ])
        );

        const mergedData = allDates.map(date => ({
            date,
            count: dataMap.get(date.toISOString().split("T")[0]) || 0
        }));

        // Scales
        const x = d3.scaleTime()
            .domain([thirtyDaysAgo, now])
            .range([marginLeft, width - marginRight]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(mergedData, d => d.count) || 0])
            .nice()
            .range([height - marginBottom, marginTop]);

        const barWidth = (width - marginLeft - marginRight) / mergedData.length;

        // Create or update SVG
        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .style("max-width", "100%")
            .style("height", "auto");

        // Add X-axis
        svg.selectAll(".x-axis").remove();
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x)
            .ticks(d3.timeDay.every(1))
            .tickFormat((domainValue) => {
                // Check if domainValue is a Date object
                if (domainValue instanceof Date) {
                    return d3.timeFormat("%m/%d")(domainValue);
                } else {
                    return ''; // Return an empty string or default value if not a Date
                }
            })
        );        
        // Add Y-axis
        svg.selectAll(".y-axis").remove();
        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).ticks(height / 40))
            .call(g => g.select(".domain").remove());

        // Remove old bars
        svg.selectAll(".bar").remove();

        // Tooltip creation
        let tooltip = d3.select(".tooltip") as d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;

        if (tooltip.empty()) {
            tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("visibility", "hidden")
                .style("background-color", "#fff")
                .style("border", "1px solid #ccc")
                .style("border-radius", "4px")
                .style("padding", "8px")
                .style("box-shadow", "0 0 10px rgba(0, 0, 0, 0.2)") as d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
        }
        
        // Add bars
        svg.selectAll(".bar")
            .data(mergedData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.date)- (barWidth / 2))
            .attr("y", d => y(d.count))
            .attr("width", barWidth - 1)
            .attr("height", d => Math.max(0, height - marginBottom - y(d.count)))
            .attr("fill", "#b9e9c5")
            .on("mouseover", function (event, d) {
                tooltip.style("visibility", "visible")
                    .html(`Date: ${d3.timeFormat("%a %m/%d")(d.date)}<br>Clicks: ${d.count}`);
                d3.select(this)
                    .attr("fill", "#b9e9c5");
            })
            .on("mousemove", function (event) {
                tooltip
                    .style("top", `${event.pageY + 5}px`)
                    .style("left", `${event.pageX + 5}px`);
            })
            .on("mouseout", function () {
                tooltip.style("visibility", "hidden");
                d3.select(this)
                    .attr("fill", "#b9e9c5");
            });

        return () => {
            svg.selectAll(".bar").remove();
            svg.selectAll(".x-axis").remove();
            svg.selectAll(".y-axis").remove();
            tooltip.remove();
        };
    }, [data, showGraph]);  // Trigger effect when showGraph changes

    return (
        <>
            {!showGraph ? (
                <div className="p-8 border bg-white rounded-xl hover:cursor-pointer hover:bg-stone-100" onClick={() => setShowGraph(true)}>
                    <div className="flex justify-between">
                        <div>
                            <h2 className="text-m font-bold">{data.link_title}</h2>
                        </div>
                        <div className="text-right ">
                            <h2 className="text-m font-bold">{totalClicks} Clicks</h2>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-8 border bg-white rounded-xl hover:cursor-pointer"  onClick={() => setShowGraph(false)}>
                    <div className="flex justify-between mb-6">
                        <div>
                            <h2 className="text-m font-bold">{data.link_title}</h2>
                            <p className="text-slate-500 text-sm">{data.link_url}</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-m font-bold">Total Clicks</h2>
                            <p>{totalClicks}</p>
                        </div>
                        

                    </div>
                    <svg ref={svgRef} className="w-full h-auto" />
                </div>
            )}
        </>
    );
}
