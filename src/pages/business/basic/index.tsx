import { Space, Tag, Button, Dropdown, Table, Menu } from 'antd';
import { getBusinessUserList } from '@/api/business';
import MyButton from '@/components/basic/button';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { BuniesssUser } from '@/interface/business';
import { FC, useState, useEffect, useContext } from 'react';
import { supabase } from './../../../config/supabase';
import { AuthContext } from './../../../context/AuthContext';
import { DownloadOutlined, DownOutlined } from '@ant-design/icons';
import { read, utils, writeFile } from "xlsx";

const BusinessBasicPage: FC = () => {
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(4);
  const [loading, setLoading] = useState();

  const currentUser = useContext(AuthContext);
  const useID = currentUser?.currentUser?.id;

  //list classes
  const [listDataClassesResponse, setListDataClassesResponse] = useState<any[]>([]);
  const [ClassCode, setClassCode] = useState('Class code');
  //list exam
  const [exam, setExam] = useState('Exams');
  const [listDataExamsResponse, setListDataExamsResponse] = useState<any[]>([]);
  const columns = [
    {
      title: '#',
      dataIndex: '',
      key: '',
      render: (value, item, index) => {
        return (page - 1) * paginationSize + index + 1;
      },
      width: 150,
    },
    {
      title: 'ID',
      dataIndex: 'students',

      render: (data, item) => {
        return data?.student_code || '';
      },
    },
    {
      title: 'Name',
      dataIndex: 'students',
      // width: 150,
      render: (data, item) => {
        return data?.full_name || '';
      },
    },
    {
      title: 'Point',
      dataIndex: 'point',
    },
  ];

  //list data students
  const [listDataStudentResponse, setListDataStudentResponse] = useState<any[]>([]);
  useEffect(async () => {
    const { data: classes, err } = await supabase
      .from('classes')
      .select('*', 'class_code')
      .eq('uid', useID)
      .eq('is_delete', false);

    setListDataClassesResponse(classes);
  }, [useID]);
  //ClassID
  const [ClassID, setClassID] = useState('');
  // menu class code
  const menuClassCode = () => {
    const classCodeListTmp = new Set(listDataClassesResponse?.map(e => e.class_code).sort());
    const classCodeListRender = [...classCodeListTmp].map(c => ({
      key: c,
      label: c,
    }));
  
    return (
      <Menu
        onClick={async e => {
          setClassCode(e.key);
          const { data: classID, err } = await supabase
            .from('classes')
            .select('id')
            .eq('class_code', e.key)
            .eq('is_delete', false);
          setClassID(classID[0].id);

          const { data: exams, err1 } = await supabase
            .from('exams')
            .select('*')
            .eq('class_id', classID[0].id)
            .eq('is_delete', false);

          setListDataExamsResponse(exams);
          setLoading(true);
        }}
        items={classCodeListRender}
      />
    );
  };

  const menuExam = () => {
    const examsListTmp = new Set(listDataExamsResponse.map(e => e.name).sort());

    const examListRender = [...examsListTmp].map(c => ({
      key: c,
      label: c,
    }));

    return (
      <Menu
        onClick={async e => {
          setExam(e.key);
          console.log(e);
          const { data: exams, err1 } = await supabase
            .from('exams')
            .select('*')
            .eq('name', e.key)
            .eq('class_id', ClassID)
            .eq('is_delete', false);

          const IDExam = exams[0].id;

          const { data: result, error } = await supabase
            .from('answer_students')
            .select('*, students(student_code,full_name)')
            .eq('students.is_delete', false)
            // .eq("exam_id", IDExam)
            .eq('students.class_id', ClassID);
            
            console.log("🚀 ~ file: index.tsx:129 ~ menuExam ~ result", result)
            const liststudentresult = result.map(e => ({ fullname: e.students.full_name,id:e.student_id, student_code:e.students.student_code ,point:e.point}))
          setListDataStudentResponse(result);
          setLoading(false);
        }}
        items={examListRender}
      />
    );
  };

  // for (let i = 0; i < 100; i++) {
  //   data.push({
  //     key: i,
  //     name: `Edward King ${i}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${i}`,
  //   });
  // }
  const handleExport = () => {
    const listStudentExport = listDataStudentResponse.map(e => ({ student_code:e.students.student_code ,fullname: e.students.full_name, point:e.point}))

    console.log("🚀 ~ file: index.tsx:151 ~ handleExport ~ listStudentExport", listStudentExport)
    const headings = [["student_code", "full_name", "point"]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, listStudentExport, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Report");
    const nameFile = ClassCode + "-"+exam +"Students Report.xlsx";
    writeFile(wb, nameFile);
    console.log(
      "🚀 ~ file: homeComponent.jsx ~ line 46 ~ handleExport ~ wb",
      wb
    );
  };
  return (
    <div>
      {/* css={styles} */}
      <div className="tabs-main">
        <div className="aside-main">
          {/* <div style={{ display: 'flex', padding: '20px' }}> */}
          <Space style={{ padding: '20px' }}>
            <label style={{ paddingRight: '10px', fontWeight: 'bold', paddingTop: '5px' }}>
              Please choose a class and exam
            </label>
            <Dropdown overlay={menuClassCode()} className="dropdown-scroll">
              <Button>
                <Space>
                  {ClassCode}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>

            <Dropdown overlay={menuExam()} className="dropdown-scroll">
              <Button>
                <Space>
                  {exam}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>

            <div style={{ paddingLeft: '200px', justifyContent: 'center' }}>
            {/* <Search
              placeholder="Search students by name..."
              // onSearch={}
              enterButton
              style={{
                width: 250,
                paddingRight: '10px',
              }}
            /> */}
          </div>
          <div style={{ paddingLeft: '300px', justifyContent: 'center' }}>
          </div>
          </Space>
          <div
            className="content-table"
            style={{
              overflow: 'auto',
              height: '100%',
              width: '100%',
              borderRadius: '2px',
              boxShadow: '0 4px 28px rgba(123,151,158,.25)',
              border: '1px solid #d6dee1',
              padding: '1rem',
            }}
          >
            <div className="table" style={{ marginTop: '0', paddingTop: '0' }}>
              <h3>Result of students</h3>
              <Table
                columns={columns}
                dataSource={listDataStudentResponse}
                loading={loading}
                pagination={{
                  onChange(current, pageSize) {
                    setPage(current);
                    setPaginationSize(pageSize);
                  },
                  defaultPageSize: 50,
                }}
                scroll={{
                  y: 240,
                }}
              />
            </div>
            
          </div>
          
        </div>
        
      </div>
      <div className="col-md-6" style={{paddingTop:'40px'}}>
              <Button
                onClick={handleExport}
                className="btn btn-primary float-right"
                style={{backgroundColor:'#00CC99'}}
              >
                <b>Export</b> <DownloadOutlined />
              </Button>
            </div>
    </div>
  );
};

export default BusinessBasicPage;
