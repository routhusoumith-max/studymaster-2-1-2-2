import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  LayoutDashboard, BookOpen, CalendarDays, ClipboardCheck, RotateCcw,
  Settings, Plus, Trash2, CheckCircle2, Clock3, Search, Download,
  Moon, Sun, GraduationCap, Pencil, X, Save, ChevronRight
} from "lucide-react";
import "./styles.css";

const initialData = {
  "2-1": {
    subjects: [
      { id:"dbms", name:"DBMS", code:"CS301", color:"#6d7cff", units:5, topics:["ER Model","Relational Model","SQL","Normalization","Transactions"] },
      { id:"oops", name:"OOPS", code:"CS302", color:"#a66cff", units:5, topics:["Classes & Objects","Inheritance","Polymorphism","Exception Handling","Collections"] },
      { id:"se", name:"Software Engineering", code:"CS303", color:"#22c7a8", units:5, topics:["Process Models","Requirements","Design","Testing","Maintenance"] },
      { id:"msf", name:"MSF", code:"CS304", color:"#ff9f5a", units:5, topics:["Basics of number theory","Random variables probability distribution","Continuous distribution ","Test hypothesis","Applied statistics"] },
      { id:"coa", name:"COA", code:"CS305", color:"#e85d9e", units:5, topics:["Computer Arithmetic","CPU","Memory","I/O","Pipelining"] }
    ],
    classwork: [
      {id:1,day:"Monday",time:"9:00–10:00",subject:"DBMS",task:"SQL practice + notes",done:false},
      {id:2,day:"Monday",time:"10:15–11:15",subject:"OOPS",task:"Programs / lab record",done:false},
      {id:3,day:"Tuesday",time:"9:00–10:00",subject:"COA",task:"Architecture notes",done:false},
      {id:4,day:"Tuesday",time:"10:15–11:15",subject:"SE",task:"Unit questions",done:false},
      {id:5,day:"Wednesday",time:"9:00–10:00",subject:"MSF",task:"Manual / record work",done:false},
      {id:6,day:"Wednesday",time:"10:15–11:15",subject:"DBMS",task:"Normalization problems",done:false},
      {id:7,day:"Thursday",time:"9:00–10:00",subject:"OOPS",task:"Coding practice",done:false},
      {id:8,day:"Thursday",time:"10:15–11:15",subject:"COA",task:"Numericals",done:false},
      {id:9,day:"Friday",time:"9:00–10:00",subject:"SE",task:"Revision questions",done:false},
      {id:10,day:"Friday",time:"10:15–11:15",subject:"MSF",task:"Complete record",done:false}
    ],
    internals: [
      {id:1,exam:"Internal 1",date:"Add date",time:"Add time",subjects:["DBMS","OOPS","SE"]},
      {id:2,exam:"Internal 2",date:"Add date",time:"Add time",subjects:["MSF","COA","DBMS"]},
      {id:3,exam:"Internal 3 / Model",date:"Add date",time:"Add time",subjects:["OOPS","SE","COA"]}
    ],
    revision: [
      {id:1,date:"Day 1",time:"7:00–8:00 PM",subject:"DBMS",topic:"Unit 1 + SQL",done:false},
      {id:2,date:"Day 2",time:"7:00–8:00 PM",subject:"OOPS",topic:"Classes + Inheritance",done:false},
      {id:3,date:"Day 3",time:"7:00–8:00 PM",subject:"COA",topic:"CPU + Arithmetic",done:false},
      {id:4,date:"Day 4",time:"7:00–8:00 PM",subject:"SE",topic:"Process Models + RE",done:false},
      {id:5,date:"Day 5",time:"7:00–8:00 PM",subject:"MSF",topic:"Units 1–2",done:false}
    ]
  },
  "2-2": {
    subjects: [
      { id:"ml", name:"Machine Learning", code:"CS401", color:"#6d7cff", units:5, topics:["Add Unit 1","Add Unit 2","Add Unit 3","Add Unit 4","Add Unit 5"] },
      { id:"cn", name:"Computer Networks", code:"CS402", color:"#22c7a8", units:5, topics:["Add Unit 1","Add Unit 2","Add Unit 3","Add Unit 4","Add Unit 5"] },
      { id:"daa", name:"DAA", code:"CS403", color:"#ff9f5a", units:5, topics:["Add Unit 1","Add Unit 2","Add Unit 3","Add Unit 4","Add Unit 5"] },
      { id:"elective", name:"Professional Elective", code:"PE", color:"#a66cff", units:5, topics:["Add Unit 1","Add Unit 2","Add Unit 3","Add Unit 4","Add Unit 5"] },
      { id:"lab", name:"Major / Skill Lab", code:"LAB", color:"#e85d9e", units:5, topics:["Lab 1","Lab 2","Lab 3","Lab 4","Lab 5"] }
    ],
    classwork: [
      {id:101,day:"Monday",time:"9:00–10:00",subject:"Machine Learning",task:"Theory / examples",done:false},
      {id:102,day:"Tuesday",time:"9:00–10:00",subject:"Computer Networks",task:"Protocol notes",done:false},
      {id:103,day:"Wednesday",time:"9:00–10:00",subject:"DAA",task:"Algorithm problems",done:false},
      {id:104,day:"Thursday",time:"9:00–10:00",subject:"Professional Elective",task:"Unit study",done:false},
      {id:105,day:"Friday",time:"9:00–10:00",subject:"Major / Skill Lab",task:"Lab practice",done:false}
    ],
    internals: [
      {id:101,exam:"Internal 1",date:"Add date",time:"Add time",subjects:["Machine Learning","Computer Networks","DAA"]},
      {id:102,exam:"Internal 2",date:"Add date",time:"Add time",subjects:["Professional Elective","Major / Skill Lab","Machine Learning"]},
      {id:103,exam:"Internal 3 / Model",date:"Add date",time:"Add time",subjects:["Computer Networks","DAA","Professional Elective"]}
    ],
    revision: [
      {id:101,date:"Week 1",time:"7:00–8:00 PM",subject:"Machine Learning",topic:"Unit 1",done:false},
      {id:102,date:"Week 1",time:"8:00–9:00 PM",subject:"Computer Networks",topic:"Unit 1",done:false},
      {id:103,date:"Week 2",time:"7:00–8:00 PM",subject:"DAA",topic:"Unit 1",done:false},
      {id:104,date:"Week 2",time:"8:00–9:00 PM",subject:"Professional Elective",topic:"Unit 1",done:false}
    ]
  }
};

function loadData() {
  try { return JSON.parse(localStorage.getItem("studymaster-data")) || initialData; }
  catch { return initialData; }
}

function App() {
  const [data,setData] = useState(loadData);
  const [semester,setSemester] = useState("2-1");
  const [page,setPage] = useState("dashboard");
  const [dark,setDark] = useState(true);
  const [query,setQuery] = useState("");
  const [modal,setModal] = useState(null);

  useEffect(()=>localStorage.setItem("studymaster-data",JSON.stringify(data)),[data]);

  const current = data[semester];
  const allTasks = [...current.classwork,...current.revision];
  const completed = allTasks.filter(x=>x.done).length;
  const progress = allTasks.length ? Math.round(completed/allTasks.length*100) : 0;

  const updateCurrent = (patch) => setData(prev=>({...prev,[semester]:{...prev[semester],...patch}}));

  const toggleTask = (type,id) => {
    updateCurrent({[type]:current[type].map(x=>x.id===id?{...x,done:!x.done}:x)});
  };

  const resetAll = () => {
    if(confirm("Reset this semester to the starter data?")) {
      setData(prev=>({...prev,[semester]:initialData[semester]}));
    }
  };

  const filteredSubjects = useMemo(() =>
    current.subjects.filter(s => `${s.name} ${s.code} ${s.topics.join(" ")}`.toLowerCase().includes(query.toLowerCase())),
    [current.subjects,query]
  );

  const nav = [
    ["dashboard","Dashboard",LayoutDashboard],
    ["syllabus","Syllabus",BookOpen],
    ["classwork","Class Work",CalendarDays],
    ["internals","Internals",ClipboardCheck],
    ["revision","Revision",RotateCcw],
    ["settings","Edit / Settings",Settings]
  ];

  return <div className={dark?"app dark":"app"}>
    <aside className="sidebar">
      <div className="brand"><div className="brandIcon"><GraduationCap/></div><div><b>StudyMaster</b><span>2-1 & 2-2 Planner</span></div></div>
      <div className="semSwitch">
        <button className={semester==="2-1"?"active":""} onClick={()=>setSemester("2-1")}>2-1</button>
        <button className={semester==="2-2"?"active":""} onClick={()=>setSemester("2-2")}>2-2</button>
      </div>
      <nav>{nav.map(([key,label,Icon])=><button key={key} className={page===key?"nav active":"nav"} onClick={()=>setPage(key)}><Icon size={19}/><span>{label}</span></button>)}</nav>
      <div className="sideBottom">
        <div className="miniProgress"><span>Semester progress</span><b>{progress}%</b><div><i style={{width:`${progress}%`}}/></div></div>
        <button className="nav" onClick={()=>setDark(!dark)}>{dark?<Sun size={19}/>:<Moon size={19}/>}<span>{dark?"Light mode":"Dark mode"}</span></button>
      </div>
    </aside>

    <main>
      <header className="topbar">
        <div><p className="eyebrow">COLLEGE STUDY COMMAND CENTER</p><h1>{pageTitle(page)} <span>{semester}</span></h1></div>
        <div className="topActions"><div className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search subjects..."/></div><button className="iconBtn" onClick={()=>setDark(!dark)}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button></div>
      </header>

      <section className="content">
        {page==="dashboard" && <Dashboard current={current} semester={semester} progress={progress} completed={completed} setPage={setPage} toggleTask={toggleTask}/>}
        {page==="syllabus" && <Syllabus subjects={filteredSubjects} onEdit={(s)=>setModal({type:"subject",item:s})} onAdd={()=>setModal({type:"subject",item:null})}/>}
        {page==="classwork" && <Classwork items={current.classwork} toggle={toggleTask} onAdd={()=>setModal({type:"classwork",item:null})} onEdit={item=>setModal({type:"classwork",item})}/>}
        {page==="internals" && <Internals items={current.internals} onAdd={()=>setModal({type:"internal",item:null})} onEdit={item=>setModal({type:"internal",item})}/>}
        {page==="revision" && <Revision items={current.revision} toggle={toggleTask} onAdd={()=>setModal({type:"revision",item:null})} onEdit={item=>setModal({type:"revision",item})}/>}
        {page==="settings" && <SettingsPage semester={semester} data={data} reset={resetAll} onImport={(next)=>setData(next)} />}
      </section>
    </main>

    {modal && <EditorModal modal={modal} current={current} close={()=>setModal(null)} save={(type,item)=>{
      const key=type==="subject"?"subjects":type==="classwork"?"classwork":type==="internal"?"internals":"revision";
      const list=current[key];
      const exists=item.id && list.some(x=>x.id===item.id);
      updateCurrent({[key]:exists?list.map(x=>x.id===item.id?item:x):[...list,{...item,id:Date.now()}]});
      setModal(null);
    }}/>}
  </div>
}

function pageTitle(p){return {dashboard:"Dashboard",syllabus:"Syllabus",classwork:"Class Work",internals:"Internal Exams",revision:"Revision Plan",settings:"Settings"}[p]}

function Dashboard({current,semester,progress,completed,setPage,toggleTask}) {
  const upcoming = [...current.classwork,...current.revision].filter(x=>!x.done).slice(0,5);
  return <div className="page">
    <div className="hero">
      <div><div className="pill"><span className="dot"/> {semester} ACTIVE SEMESTER</div><h2>Plan it. Study it.<br/><em>Finish it.</em></h2><p>One place for syllabus, class work, internals and revision. Everything is editable.</p></div>
      <div className="ring" style={{"--p":progress}}><div><strong>{progress}%</strong><small>complete</small></div></div>
    </div>
    <div className="stats">
      <Stat icon={BookOpen} value={current.subjects.length} label="Subjects"/>
      <Stat icon={CalendarDays} value={current.classwork.length} label="Class tasks"/>
      <Stat icon={ClipboardCheck} value={current.internals.length} label="Internal exams"/>
      <Stat icon={CheckCircle2} value={completed} label="Tasks completed"/>
    </div>
    <div className="grid2">
      <Card title="Your subjects" action="Open syllabus" onAction={()=>setPage("syllabus")}>
        <div className="subjectMini">{current.subjects.map(s=><div className="miniSubject" key={s.id}><span style={{background:s.color}}/>{s.name}<b>{s.units} Units</b></div>)}</div>
      </Card>
      <Card title="Next study tasks" action="Open revision" onAction={()=>setPage("revision")}>
        <div className="taskList">{upcoming.length?upcoming.map(t=><Task key={t.id} item={t} onToggle={()=>toggleTask(current.revision.includes(t)?"revision":"classwork",t.id)}/>):<Empty text="All visible tasks completed 🎉"/>}</div>
      </Card>
    </div>
  </div>
}
function Stat({icon:Icon,value,label}){return <div className="stat"><div className="statIcon"><Icon size={20}/></div><div><strong>{value}</strong><span>{label}</span></div></div>}
function Card({title,children,action,onAction}){return <div className="card"><div className="cardHead"><h3>{title}</h3>{action&&<button onClick={onAction}>{action}<ChevronRight size={15}/></button>}</div>{children}</div>}
function Task({item,onToggle}){return <div className={"task "+(item.done?"done":"")}><button className="check" onClick={onToggle}>{item.done&&<CheckCircle2 size={19}/>}</button><div><b>{item.subject}</b><span>{item.topic||item.task}</span></div><small>{item.time||item.date}</small></div>}
function Empty({text}){return <div className="empty">{text}</div>}

function Syllabus({subjects,onEdit,onAdd}) {
  return <div className="page"><SectionHead title="Complete syllabus" sub="Add your real university syllabus unit-by-unit."><button className="primary" onClick={onAdd}><Plus size={17}/> Add subject</button></SectionHead>
    <div className="syllabusGrid">{subjects.map(s=><div className="syllabusCard" key={s.id}><div className="subjectTop"><div className="subjectBadge" style={{background:s.color}}>{s.name.slice(0,2).toUpperCase()}</div><button className="editBtn" onClick={()=>onEdit(s)}><Pencil size={15}/></button></div><h3>{s.name}</h3><span className="code">{s.code} · {s.units} units</span><div className="units">{s.topics.map((t,i)=><div key={i}><span>U{i+1}</span>{t}</div>)}</div></div>)}</div>
  </div>
}

function Classwork({items,toggle,onAdd,onEdit}) {
  return <div className="page"><SectionHead title="Class work timetable" sub="Track records, assignments, lab work and daily college tasks."><button className="primary" onClick={onAdd}><Plus size={17}/> Add task</button></SectionHead>
    <div className="tableWrap"><table><thead><tr><th>Done</th><th>Day</th><th>Time</th><th>Subject</th><th>Work</th><th></th></tr></thead><tbody>{items.map(x=><tr key={x.id} className={x.done?"rowDone":""}><td><button className="tableCheck" onClick={()=>toggle("classwork",x.id)}>{x.done?<CheckCircle2 size={18}/>:null}</button></td><td>{x.day}</td><td><Clock3 size={14}/> {x.time}</td><td><b>{x.subject}</b></td><td>{x.task}</td><td><button className="tiny" onClick={()=>onEdit(x)}><Pencil size={14}/></button></td></tr>)}</tbody></table></div>
  </div>
}

function Internals({items,onAdd,onEdit}) {
  return <div className="page"><SectionHead title="Internal examinations" sub="Enter official dates and timings when your college releases them."><button className="primary" onClick={onAdd}><Plus size={17}/> Add exam</button></SectionHead>
    <div className="examGrid">{items.map(x=><div className="examCard" key={x.id}><div className="examIcon"><ClipboardCheck/></div><div><span>{x.exam}</span><h3>{x.date}</h3><p>{x.time}</p></div><button className="editBtn" onClick={()=>onEdit(x)}><Pencil size={15}/></button><div className="examSubjects">{x.subjects.map(s=><span key={s}>{s}</span>)}</div></div>)}</div>
    <div className="notice"><b>Important:</b> The dates above are starter placeholders, not official exam dates. Replace them with your college notice/schedule.</div>
  </div>
}

function Revision({items,toggle,onAdd,onEdit}) {
  return <div className="page"><SectionHead title="Revision timetable" sub="Use short focused sessions and mark each session complete."><button className="primary" onClick={onAdd}><Plus size={17}/> Add session</button></SectionHead>
    <div className="revisionList">{items.map((x,i)=><div className={"revisionRow "+(x.done?"done":"")} key={x.id}><div className="revNo">{String(i+1).padStart(2,"0")}</div><div className="revDate"><b>{x.date}</b><span>{x.time}</span></div><div className="revSubject"><strong>{x.subject}</strong><span>{x.topic}</span></div><button className="completeBtn" onClick={()=>toggle("revision",x.id)}>{x.done?<CheckCircle2 size={19}/>:<span/>}{x.done?"Completed":"Mark done"}</button><button className="tiny" onClick={()=>onEdit(x)}><Pencil size={14}/></button></div>)}</div>
  </div>
}

function SettingsPage({semester,data,reset,onImport}) {
  const exportData=()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="studymaster-backup.json";a.click();URL.revokeObjectURL(a.href)};
  return <div className="page"><SectionHead title="Edit / Settings" sub="Your changes are saved automatically in this browser."/>
    <div className="settingsGrid"><div className="card settingCard"><Settings/><h3>Editable workspace</h3><p>Use the Add and Edit buttons in every section. Your syllabus, class work, internal dates and revision sessions are stored locally.</p></div><div className="card settingCard"><Download/><h3>Backup your plan</h3><p>Export your complete 2-1 and 2-2 data as a JSON file.</p><button className="secondary" onClick={exportData}>Export backup</button></div><div className="card settingCard"><RotateCcw/><h3>Reset {semester}</h3><p>Restore this semester to the starter template. This cannot be undone.</p><button className="danger" onClick={reset}>Reset semester</button></div></div>
  </div>
}

function SectionHead({title,sub,children}){return <div className="sectionHead"><div><h2>{title}</h2><p>{sub}</p></div>{children}</div>}

function EditorModal({modal,close,save}) {
  const type=modal.type;
  const [item,setItem]=useState({...modal.item});
  const set=(k,v)=>setItem(x=>({...x,[k]:v}));
  const subject=type==="subject";
  const internal=type==="internal";
  return <div className="modalBg"><div className="modal"><div className="modalHead"><div><span>EDIT DATA</span><h2>{modal.item?"Update":"Add"} {type}</h2></div><button onClick={close}><X/></button></div>
    {subject && <><label>Subject name<input value={item.name||""} onChange={e=>set("name",e.target.value)} placeholder="e.g. DBMS"/></label><label>Subject code<input value={item.code||""} onChange={e=>set("code",e.target.value)} placeholder="e.g. CS301"/></label><label>Units / topics <small>Separate with commas</small><input value={(item.topics||[]).join(", ")} onChange={e=>set("topics",e.target.value.split(",").map(x=>x.trim()).filter(Boolean))}/></label></>}
    {type==="classwork" && <><label>Day<input value={item.day||""} onChange={e=>set("day",e.target.value)} placeholder="Monday"/></label><label>Time<input value={item.time||""} onChange={e=>set("time",e.target.value)} placeholder="5:00–6:00 PM"/></label><label>Subject<input value={item.subject||""} onChange={e=>set("subject",e.target.value)} placeholder="DBMS"/></label><label>Work<input value={item.task||""} onChange={e=>set("task",e.target.value)} placeholder="Record work"/></label></>}
    {internal && <><label>Exam name<input value={item.exam||""} onChange={e=>set("exam",e.target.value)} placeholder="Internal 1"/></label><label>Date<input value={item.date||""} onChange={e=>set("date",e.target.value)} placeholder="DD/MM/YYYY"/></label><label>Time<input value={item.time||""} onChange={e=>set("time",e.target.value)} placeholder="10:00 AM"/></label><label>Subjects <small>Separate with commas</small><input value={(item.subjects||[]).join(", ")} onChange={e=>set("subjects",e.target.value.split(",").map(x=>x.trim()).filter(Boolean))}/></label></>}
    {type==="revision" && <><label>Date / Day<input value={item.date||""} onChange={e=>set("date",e.target.value)} placeholder="Monday"/></label><label>Time<input value={item.time||""} onChange={e=>set("time",e.target.value)} placeholder="7:00–8:00 PM"/></label><label>Subject<input value={item.subject||""} onChange={e=>set("subject",e.target.value)} placeholder="DBMS"/></label><label>Topic<input value={item.topic||""} onChange={e=>set("topic",e.target.value)} placeholder="Unit 1"/></label></>}
    <div className="modalActions"><button className="secondary" onClick={close}>Cancel</button><button className="primary" onClick={()=>save(type,item)}><Save size={16}/> Save changes</button></div>
  </div></div>
}

createRoot(document.getElementById("root")).render(<App/>);
