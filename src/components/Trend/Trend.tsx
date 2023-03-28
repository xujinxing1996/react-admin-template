import { trendStyles } from './Trend.styles';
import { ReactComponent as CaretUpIcon } from './assets/caret-up.svg';
import { ReactComponent as CaretDownIcon } from './assets/caret-down.svg';

type TrendProps = {
  wow: string;
  dod: string;
  style?: React.CSSProperties;
};

const Trend = ({ wow, dod, style = {} }: TrendProps) => {
  return (
    <div css={trendStyles} style={style}>
      <div className="trend-item">
        <span className="trend-item-label">wow</span>
        <span className="trend-item-text">{wow}</span>
        <CaretUpIcon color="#f5222d" />
      </div>
      <div className="trend-item">
        <span className="trend-item-label">dodChange</span>
        <span className="trend-item-text">{dod}</span>
        <CaretDownIcon color="#52c41a" />
      </div>
    </div>
  );
};

export default Trend;
