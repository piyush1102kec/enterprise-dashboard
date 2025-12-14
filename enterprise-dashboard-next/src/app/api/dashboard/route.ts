import { NextResponse } from 'next/server';
import { kpiData, stockHistory, watchlistData, marketAlerts } from '@/lib/data';

export async function GET() {
    // Simulate database delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
        kpiData,
        stockHistory,
        watchlistData,
        marketAlerts
    });
}
