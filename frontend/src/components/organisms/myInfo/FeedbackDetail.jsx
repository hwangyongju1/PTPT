import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbackDetail } from '../../../store/actions/feedbackActions';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { useTable } from 'react-table';

const FeedbackDetail = () => {
  const { studyRoomId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feedbackDetail = useSelector((state) => state.feedback.feedback);
  const loading = useSelector((state) => state.feedback.loading);
  const error = useSelector((state) => state.feedback.error);
  const oauthId = useSelector((state) => state.auth.user.oauthId);

  useEffect(() => {
    if (oauthId && studyRoomId) {
      dispatch(fetchFeedbackDetail(oauthId, studyRoomId));
    }
  }, [dispatch, oauthId, studyRoomId]);

  const handleBackClick = () => {
    navigate('/myinfo/statistics');
  };

  const columns = React.useMemo(
    () => [
      { Header: '작성자', accessor: 'nickname' },
      { Header: '발표력', accessor: 'delivery' },
      { Header: '표현력', accessor: 'expression' },
      { Header: '논리성', accessor: 'logic' },
      { Header: '준비성', accessor: 'preparation' },
      { Header: '적합성', accessor: 'suitability' },
      { Header: '코멘트', accessor: 'commentContent' },
    ],
    []
  );

  const data = React.useMemo(() => feedbackDetail || [], [feedbackDetail]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        피드백 상세
      </Typography>
      <Button variant="contained" color="primary" onClick={handleBackClick} sx={{ mb: 2 }}>
        뒤로
      </Button>
      <TableContainer component={Paper}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell key={column.id} {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <TableRow key={row.id} {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <TableCell key={cell.column.id} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default FeedbackDetail;
