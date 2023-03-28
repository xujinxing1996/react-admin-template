import { Card, Tooltip } from 'antd';
import { overview } from './CardSkeleton.styles';
import { InfoCircleOutlined } from '@ant-design/icons';

type CardSkeletonProps = {
  metaName: string;
  metaCount: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  loading: boolean;
};

const CardSkeleton = ({ metaName, metaCount, body, footer, loading }: CardSkeletonProps) => {
  return (
    <Card loading={loading} css={overview} bordered={false}>
      <div className="overview-header">
        <div className="overview-header-meta">{metaName}</div>
        <div className="overview-header-count">{metaCount}</div>
        <Tooltip title="Introduce">
          <InfoCircleOutlined className="overview-header-action" />
        </Tooltip>
      </div>
      <div className="overview-body">{body}</div>
      <div className="overview-footer">{footer}</div>
    </Card>
  );
};

export default CardSkeleton;
