"use client"
import Hero from "./Hero"
import SubjectCard from "./SubjectCard"
import { subjects } from "@/lib/subjects"

type IconName =
  | "PythonIcon"
  | "JavaScriptIcon"
  | "ReactIcon"
  | "NodeJSIcon"
  | "TypeScriptIcon"
  | "JavaIcon"
  | "CppIcon"
  | "CIcon"
  | "GoIcon"
  | "RustIcon"
  | "SwiftIcon"
  | "KotlinIcon"
  | "CSharpIcon"
  | "SQLIcon"
  | "HTMLIcon"
  | "CSSIcon"
  | "GitIcon"
  | "DockerIcon"
  | "LinuxIcon"
  | "VueIcon"
  | "AngularIcon"
  | "FlutterIcon"
  | "MongoDBIcon"
  | "PostgreSQLIcon";

function Cheatsheet() {
  // Icon name mapping for SubjectCard component
  const iconMapping: { [key: string]: IconName } = {
    python: "PythonIcon",
    javascript: "JavaScriptIcon",
    react: "ReactIcon",
    nodejs: "NodeJSIcon",
    typescript: "TypeScriptIcon",
    java: "JavaIcon",
    cpp: "CppIcon",
    c: "CIcon",
    go: "GoIcon",
    rust: "RustIcon",
    swift: "SwiftIcon",
    kotlin: "KotlinIcon",
    csharp: "CSharpIcon",
    sql: "SQLIcon",
    html: "HTMLIcon",
    css: "CSSIcon",
    git: "GitIcon",
    docker: "DockerIcon",
    linux: "LinuxIcon",
    vue: "VueIcon",
    angular: "AngularIcon",
    flutter: "FlutterIcon",
    mongodb: "MongoDBIcon",
    postgresql: "PostgreSQLIcon",
  };

  // Transform subjects data to match component structure
  const transformedSubjects = Object.entries(subjects).map(([id, subjectData]) => ({
    id,
    title: subjectData.subject,
    description: subjectData.description,
    iconName: iconMapping[id],
    href: `/${id}`,
  }));

  // Categorize subjects
  const programmingLanguages = transformedSubjects.filter(subject =>
    ['python', 'javascript', 'typescript', 'java', 'cpp', 'c', 'go', 'rust', 'swift', 'kotlin', 'csharp'].includes(subject.id)
  );

  const webTechnologies = transformedSubjects.filter(subject =>
    ['react', 'vue', 'angular', 'html', 'css'].includes(subject.id)
  );

  const backendTools = transformedSubjects.filter(subject =>
    ['nodejs', 'sql', 'mongodb', 'postgresql'].includes(subject.id)
  );

  const devOpsTools = transformedSubjects.filter(subject =>
    ['git', 'docker', 'linux'].includes(subject.id)
  );

  const mobileFrameworks = transformedSubjects.filter(subject =>
    ['flutter'].includes(subject.id)
  );

   return (
     
        <div  className="min-h-screen"> 
             <Hero />
             
             <section className="py-12 sm:py-16 md:py-20">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 {/* Section Header */}
                 <div className="text-center mb-12 md:mb-16">
                   <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 px-2">
                     Master Programming with 
                     <span className="text-[#007AFF]"> Quick Cheatsheets</span>
                   </h2>
                   <p className="text-lg sm:text-xl text-[#d1d1d1] max-w-3xl mx-auto px-4">
                     Access comprehensive programming references for 20+ languages and technologies. 
                     From beginner basics to advanced concepts, accelerate your coding productivity.
                   </p>
                 </div>
       
                 {/* Programming Languages */}
                 <div className="mb-12 md:mb-16">
                   <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Programming Languages</h3>
                   <p className="text-[#d1d1d1] mb-6 md:mb-8 text-sm sm:text-base">Essential languages for modern development</p>
                   
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                     {programmingLanguages.map((subject) => (
                       <SubjectCard
                         key={subject.id}
                         title={subject.title}
                         description={subject.description}
                         iconName={subject.iconName}
                         href={subject.href}
                       />
                     ))}
                   </div>
                 </div>
       
                 {/* Web Technologies */}
                 <div className="mb-12 md:mb-16">
                   <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Web Development</h3>
                   <p className="text-[#d1d1d1] mb-6 md:mb-8 text-sm sm:text-base">Frontend frameworks and web technologies</p>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                     {webTechnologies.map((subject) => (
                       <SubjectCard
                         key={subject.id}
                         title={subject.title}
                         description={subject.description}
                         iconName={subject.iconName}
                         href={subject.href}
                       />
                     ))}
                   </div>
                 </div>
       
                 {/* Backend & Database */}
                 <div className="mb-12 md:mb-16">
                   <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Backend & Database</h3>
                   <p className="text-[#d1d1d1] mb-6 md:mb-8 text-sm sm:text-base">Server-side technologies and data management</p>
                   
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                     {backendTools.map((subject) => (
                       <SubjectCard
                         key={subject.id}
                         title={subject.title}
                         description={subject.description}
                         iconName={subject.iconName}
                         href={subject.href}
                       />
                     ))}
                   </div>
                 </div>
       
                 {/* DevOps & Tools */}
                 <div className="mb-12 md:mb-16">
                   <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">DevOps & Tools</h3>
                   <p className="text-[#d1d1d1] mb-6 md:mb-8 text-sm sm:text-base">Development tools and deployment technologies</p>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                     {devOpsTools.map((subject) => (
                       <SubjectCard
                         key={subject.id}
                         title={subject.title}
                         description={subject.description}
                         iconName={subject.iconName}
                         href={subject.href}
                       />
                     ))}
                   </div>
                 </div>
       
                 {/* Mobile Development */}
                 <div className="mb-12 md:mb-16">
                   <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Mobile Development</h3>
                   <p className="text-[#d1d1d1] mb-6 md:mb-8 text-sm sm:text-base">Cross-platform mobile app development</p>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                     {mobileFrameworks.map((subject) => (
                       <SubjectCard
                         key={subject.id}
                         title={subject.title}
                         description={subject.description}
                         iconName={subject.iconName}
                         href={subject.href}
                       />
                     ))}
                   </div>
                 </div>
               </div>
             </section>
           </div>
     
   )
 }
 
 export default Cheatsheet
 