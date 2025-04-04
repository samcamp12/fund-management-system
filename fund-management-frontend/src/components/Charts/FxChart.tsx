import { ChartComponent, defaultDateFormatter } from '../ChartComponent';
import { ExchangeRate } from '../MarketDataPage';

const FxChart = ({ data }: { data: ExchangeRate[] }) => (
  <ChartComponent<ExchangeRate>
    data={data}
    xKey="date"
    lines={[
      { dataKey: 'usdToEur', color: '#ff7300', label: 'EUR', dot: false },
    ]}
    xAxisTickFormatter={defaultDateFormatter}
    tooltipLabelFormatter={defaultDateFormatter}
    yDomain={[0.8, 'auto']}
    yAxisUnit='€'
  />
);

export default FxChart;
