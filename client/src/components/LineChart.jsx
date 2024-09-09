import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function LineChart(datasets) {
    
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Destruir el gráfico existente si hay uno
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');

        chartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Maduro', 'Edmundo'],
                datasets: [{
                    label: '# of Votes',
                    data: [1500, 7000],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Limpia la funcion para destruir la grafica cuando se desmonte (aparentemente ya tiene un componente asignado)
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
            <div className='w-[400px] mt-10'>
                <h1 className='text-base text-slate-600 font-bold tracking-wide'>Numero de Votos</h1>
                <canvas ref={chartRef} id="myChart" className='mobile:h-[300px]'></canvas>
            </div>
    );
}
