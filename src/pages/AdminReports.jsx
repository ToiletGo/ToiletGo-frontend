import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../api/axios.js';
import { useAuth } from '../hooks/useAuth.js';

const Container = styled.div`
    padding: 20px;
`;

const Title = styled.h2`
    margin-bottom: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Th = styled.th`
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #f4f4f4;
    text-align: left;
`;

const Td = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
`;

const Message = styled.div`
    margin-top: 20px;
    color: #888;
`;

const AdminReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = useAuth(); // assuming admin is also authenticated

    useEffect(() => {
        const fetchReports = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            const res = await axios.get('/api/admin/reports', {
            headers: { Authorization: `Bearer ${token}` }
            });
            setReports(res.data);
        } catch (err) {
            if (err.response?.status === 204) {
            setReports([]);
            } else {
            setError('신고 내역을 불러오는 중 오류가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
        };

        fetchReports();
    }, [userId]);

    if (loading) {
        return <Message>불러오는 중...</Message>;
    }

    if (error) {
        return <Message>{error}</Message>;
    }

    if (reports.length === 0) {
        return <Message>신고된 내역이 없습니다.</Message>;
    }

    return (
        <Container>
        <Title>신고 내역 관리</Title>
        <Table>
            <thead>
            <tr>
                <Th>신고 ID</Th>
                <Th>신고자 ID</Th>
                <Th>대상 리뷰 ID</Th>
                <Th>대상 화장실 ID</Th>
                <Th>신고 유형</Th>
                <Th>신고 사유</Th>
                <Th>처리 여부</Th>
                <Th>신고 일시</Th>
            </tr>
            </thead>
            <tbody>
            {reports.map(report => (
                <tr key={report.reportId}>
                <Td>{report.reportId}</Td>
                <Td>{report.userId}</Td>
                <Td>{report.reviewId ?? '-'}</Td>
                <Td>{report.toiletId ?? '-'}</Td>
                <Td>{report.reportType}</Td>
                <Td>{report.description}</Td>
                <Td>{report.isProcessed ? '처리됨' : '미처리'}</Td>
                <Td>{new Date(report.reportAt).toLocaleString()}</Td>
                </tr>
            ))}
            </tbody>
        </Table>
        </Container>
    );
};

export default AdminReports;
