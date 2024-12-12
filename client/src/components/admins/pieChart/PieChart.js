import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useGetTopBookedMovie, valueFormatter } from "./DataForPieChar";

export default function PieArcLabel() {
    const topBookedMovie = useGetTopBookedMovie();
    return (
        <PieChart
            series={[
                {
                    arcLabel: (item) => `${item.value}%`,
                    arcLabelMinAngle: 35,
                    arcLabelRadius: "60%",
                    data: topBookedMovie,
                    valueFormatter
                },
            ]}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: "bold",
                },
            }}
            {...size}
        />
    );
}

const size = {
    width: 650,
    height: 250,
};

const data = {
    data: useGetTopBookedMovie,
    valueFormatter,
};
