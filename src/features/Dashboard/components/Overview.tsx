import { Badge, Col, ColProps, Progress, Row } from 'antd';
import { ResponsiveContainer, AreaChart, Tooltip as RTooltip, Area, XAxis, BarChart, Bar } from 'recharts';
import CardSkeleton from '../../../components/CardSkeleton';
import Trend from '../../../components/Trend';
import dayjs from 'dayjs';

const data = new Array(14).fill(null).map((_, index) => ({
  name: dayjs().add(index, 'day').format('YYYY-MM-DD'),
  number: Math.floor(Math.random() * 8 + 1),
}));

const CustomTooltip = ({ active, payload, label }: any) =>
  active && (
    <div className="customTooltip">
      <span className="customTooltip-title">
        <Badge color={payload[0].fill} /> {label} : {payload[0].value}
      </span>
    </div>
  );

type FieldProps = {
  name: string;
  number: string;
};

const Field = ({ name, number }: FieldProps) => (
  <div className="field">
    <span className="field-label">{name}</span>
    <span className="field-number">{number} </span>
  </div>
);

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 6,
};

type OverviewProps = {
  loading: boolean;
};

const Overview = ({ loading }: OverviewProps) => {
  return (
    <Row gutter={[12, 12]}>
      <Col {...wrapperCol}>
        <CardSkeleton
          loading={loading}
          metaName="totalSales"
          metaCount="¥ 126,560"
          body={<Trend wow="12%" dod="12%" />}
          footer={<Field name="dailySales" number="￥12,423" />}
        />
      </Col>
      <Col {...wrapperCol}>
        <CardSkeleton
          loading={loading}
          metaName="visits"
          metaCount="8846"
          body={
            <ResponsiveContainer>
              <AreaChart data={data}>
                <XAxis dataKey="name" hide />
                <RTooltip content={<CustomTooltip />} />
                <Area strokeOpacity={0} type="monotone" dataKey="number" fill="#8E65D3" />
              </AreaChart>
            </ResponsiveContainer>
          }
          footer={<Field name="dailySales" number="1234" />}
        />
      </Col>
      <Col {...wrapperCol}>
        <CardSkeleton
          loading={loading}
          metaName="payments"
          metaCount="6560"
          body={
            <ResponsiveContainer>
              <BarChart data={data}>
                <XAxis dataKey="name" hide />
                <RTooltip content={<CustomTooltip />} />
                <Bar strokeOpacity={0} barSize={10} dataKey="number" stroke="#3B80D9" fill="#3B80D9" />
              </BarChart>
            </ResponsiveContainer>
          }
          footer={<Field name="conversionRate" number="60%" />}
        />
      </Col>
      <Col {...wrapperCol}>
        <CardSkeleton
          loading={loading}
          metaName="operationalEffect"
          metaCount="8846"
          body={<Progress strokeColor="#58BFC1" percent={85} />}
          footer={<Trend style={{ position: 'inherit' }} wow="12%" dod="12%" />}
        />
      </Col>
    </Row>
  );
};

export default Overview;
