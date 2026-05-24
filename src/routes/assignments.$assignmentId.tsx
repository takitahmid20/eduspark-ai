import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { AppShell } from "@/components/app/shell";
import { motion } from "framer-motion";
import {
  ArrowLeft, Upload, FileText, Image as ImageIcon, X, Loader2,
  CheckCircle2, AlertTriangle, Pencil, Check, Brain, Hash, ClipboardList, BookCheck,
} from "lucide-react";
import {
  getAssignment, uploadQuestions, getQuestions, updateQuestion,
  uploadRubrics, getRubrics, updateRubric,
  uploadSolutions, getSolutions, updateSolution,
} from "@/lib/api";
import type { Assignment, Question, Rubric, RubricDescription, Solution } from "@/lib/api";
import { DetailSkeleton } from "@/components/app/skeleton";

export const Route = createFileRoute("/assignments/$assignmentId")({
  head: () => ({ meta: [{ title: "Assignment — TAAI" }] }),
  component: AssignmentDetail,
});

type Tab = "questions" | "rubrics" | "solutions";

function AssignmentDetail() {
  const { assignmentId } = Route.useParams();
  const id = Number(assignmentId);

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loadingAssignment, setLoadingAssignment] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("questions");

  // Upload state (shared)
  const [files, setFiles] = useState<File[]>([]);
  const [isHandwritten, setIsHandwritten] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Questions state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [questionEditForm, setQuestionEditForm] = useState({ question_label: "", question_description: "", marks: "" });
  const [questionEditLoading, setQuestionEditLoading] = useState(false);

  // Rubrics state
  const [rubrics, setRubrics] = useState<Rubric[]>([]);
  const [loadingRubrics, setLoadingRubrics] = useState(false);
  const [editingRubricId, setEditingRubricId] = useState<number | null>(null);
  const [rubricEditForm, setRubricEditForm] = useState({ question_label: "", rubric_description: "" });
  const [rubricEditLoading, setRubricEditLoading] = useState(false);

  // Solutions state
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loadingSolutions, setLoadingSolutions] = useState(false);
  const [editingSolutionId, setEditingSolutionId] = useState<number | null>(null);
  const [solutionEditForm, setSolutionEditForm] = useState({ question_label: "", solution_text: "" });
  const [solutionEditLoading, setSolutionEditLoading] = useState(false);

  // Fetch assignment
  useEffect(() => {
    async function load() {
      setLoadingAssignment(true);
      const result = await getAssignment(id);
      if (result.data) setAssignment(result.data);
      setLoadingAssignment(false);
    }
    load();
  }, [id]);

  // Fetch questions
  const fetchQuestions = useCallback(async () => {
    setLoadingQuestions(true);
    const result = await getQuestions(id);
    if (result.data) setQuestions(result.data.data);
    setLoadingQuestions(false);
  }, [id]);

  // Fetch rubrics
  const fetchRubrics = useCallback(async () => {
    setLoadingRubrics(true);
    const result = await getRubrics(id);
    if (result.data) setRubrics(result.data.data);
    setLoadingRubrics(false);
  }, [id]);

  // Fetch solutions
  const fetchSolutions = useCallback(async () => {
    setLoadingSolutions(true);
    const result = await getSolutions(id);
    if (result.data) setSolutions(result.data.data);
    setLoadingSolutions(false);
  }, [id]);

  useEffect(() => { fetchQuestions(); fetchRubrics(); fetchSolutions(); }, [fetchQuestions, fetchRubrics, fetchSolutions]);

  // File handling
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files;
    if (!selected) return;
    setFiles(Array.from(selected).slice(0, 10));
    setUploadError(null);
    setUploadSuccess(null);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setFiles(Array.from(e.dataTransfer.files).slice(0, 10));
    setUploadError(null);
    setUploadSuccess(null);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  // Upload
  async function handleUpload() {
    if (files.length === 0) return;
    setUploadError(null);
    setUploadSuccess(null);
    setUploading(true);

    if (activeTab === "questions") {
      const result = await uploadQuestions(id, files, isHandwritten);
      setUploading(false);
      if (result.error) { setUploadError(result.error); return; }
      setUploadSuccess("Questions extracted successfully!");
      setFiles([]);
      fetchQuestions();
    } else if (activeTab === "rubrics") {
      const result = await uploadRubrics(id, files, isHandwritten);
      setUploading(false);
      if (result.error) { setUploadError(result.error); return; }
      setUploadSuccess("Rubrics extracted successfully!");
      setFiles([]);
      fetchRubrics();
    } else {
      const result = await uploadSolutions(id, files, isHandwritten);
      setUploading(false);
      if (result.error) { setUploadError(result.error); return; }
      setUploadSuccess("Solutions extracted successfully!");
      setFiles([]);
      fetchSolutions();
    }
  }

  // Edit question
  function startEditQuestion(q: Question) {
    setEditingQuestionId(q.id);
    setQuestionEditForm({
      question_label: q.question_label,
      question_description: q.question_description,
      marks: q.marks != null ? String(q.marks) : "",
    });
  }

  async function handleQuestionEditSave() {
    if (!editingQuestionId) return;
    setQuestionEditLoading(true);
    await updateQuestion(editingQuestionId, {
      question_label: questionEditForm.question_label.trim() || undefined,
      question_description: questionEditForm.question_description.trim() || undefined,
      marks: questionEditForm.marks ? Number(questionEditForm.marks) : undefined,
    });
    setQuestionEditLoading(false);
    setEditingQuestionId(null);
    fetchQuestions();
  }

  // Edit rubric
  function startEditRubric(r: Rubric) {
    setEditingRubricId(r.id);
    setRubricEditForm({
      question_label: r.question_label,
      rubric_description: JSON.stringify(r.rubric_description, null, 2),
    });
  }

  async function handleRubricEditSave() {
    if (!editingRubricId) return;
    setRubricEditLoading(true);
    let parsedDescription: RubricDescription | undefined;
    try {
      parsedDescription = JSON.parse(rubricEditForm.rubric_description);
    } catch {
      setUploadError("Invalid JSON in rubric description.");
      setRubricEditLoading(false);
      return;
    }
    await updateRubric(editingRubricId, {
      question_label: rubricEditForm.question_label.trim() || undefined,
      rubric_description: parsedDescription,
    });
    setRubricEditLoading(false);
    setEditingRubricId(null);
    fetchRubrics();
  }

  // Edit solution
  function startEditSolution(s: Solution) {
    setEditingSolutionId(s.id);
    setSolutionEditForm({
      question_label: s.question_label,
      solution_text: s.solution_text,
    });
  }

  async function handleSolutionEditSave() {
    if (!editingSolutionId) return;
    setSolutionEditLoading(true);
    await updateSolution(editingSolutionId, {
      question_label: solutionEditForm.question_label.trim() || undefined,
      solution_text: solutionEditForm.solution_text.trim() || undefined,
    });
    setSolutionEditLoading(false);
    setEditingSolutionId(null);
    fetchSolutions();
  }

  function getFileIcon(file: File) {
    if (file.type.startsWith("image/")) return <ImageIcon className="size-4" />;
    return <FileText className="size-4" />;
  }

  if (loadingAssignment) {
    return (
      <AppShell title="Assignment">
        <DetailSkeleton />
      </AppShell>
    );
  }

  return (
    <AppShell
      title={assignment?.title || `Assignment #${id}`}
      subtitle={assignment ? `${assignment.subject} · ${assignment.total_marks} marks` : undefined}
    >
      <div className="w-full">
        {/* Back */}
        <Link to="/assignments" className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition cursor-pointer mb-6">
          <ArrowLeft className="size-4" /> Back to Assignments
        </Link>

        {/* Assignment details card */}
        {assignment && (
          <div className="mb-6 p-5 rounded-lg bg-card border border-border flex flex-wrap items-center gap-6">
            <div className="size-12 rounded-md bg-primary grid place-items-center text-primary-foreground text-sm font-bold shrink-0">
              {assignment.subject.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display font-bold text-lg truncate">{assignment.title}</h2>
              <p className="text-sm text-muted-foreground">{assignment.subject}{assignment.topic ? ` · ${assignment.topic}` : ""}</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{assignment.total_marks}</div>
                <div className="text-[11px] text-muted-foreground">Total Marks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{questions.length}</div>
                <div className="text-[11px] text-muted-foreground">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{rubrics.length}</div>
                <div className="text-[11px] text-muted-foreground">Rubrics</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{solutions.length}</div>
                <div className="text-[11px] text-muted-foreground">Solutions</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-mono text-muted-foreground">ID</div>
                <div className="text-sm font-bold">{id}</div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-md bg-muted/50 border border-border w-fit mb-6">
          <button
            onClick={() => { setActiveTab("questions"); setFiles([]); setUploadError(null); setUploadSuccess(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${activeTab === "questions" ? "bg-primary text-primary-foreground " : "text-muted-foreground hover:text-foreground"}`}
          >
            Questions
          </button>
          <button
            onClick={() => { setActiveTab("rubrics"); setFiles([]); setUploadError(null); setUploadSuccess(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${activeTab === "rubrics" ? "bg-primary text-primary-foreground " : "text-muted-foreground hover:text-foreground"}`}
          >
            Rubrics
          </button>
          <button
            onClick={() => { setActiveTab("solutions"); setFiles([]); setUploadError(null); setUploadSuccess(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${activeTab === "solutions" ? "bg-primary text-primary-foreground " : "text-muted-foreground hover:text-foreground"}`}
          >
            Solutions
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-6">
          {/* Left: Upload */}
          <div className="space-y-5">
            <h2 className="font-display font-bold text-lg">
              Upload {activeTab === "questions" ? "Question Papers" : activeTab === "rubrics" ? "Rubric Documents" : "Solution Documents"}
            </h2>
            <p className="text-sm text-muted-foreground -mt-3">
              {activeTab === "questions"
                ? "Upload exam question papers (images or PDFs). AI will extract individual questions."
                : activeTab === "rubrics"
                ? "Upload rubric/marking scheme documents. AI will extract grading criteria."
                : "Upload teacher solution documents. AI will extract model answers."}
            </p>

            {/* Drop zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="rounded-lg border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-8 text-center hover:border-primary/50 transition"
            >
              <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf" onChange={handleFileSelect} className="hidden" />
              <div className="size-14 rounded-lg bg-primary mx-auto grid place-items-center text-primary-foreground">
                <Upload className="size-6" />
              </div>
              <h3 className="font-bold mt-3">
                Drop {activeTab === "questions" ? "question papers" : activeTab === "rubrics" ? "rubric documents" : "solution documents"} here
              </h3>
              <p className="text-xs text-muted-foreground mt-1">Images (JPG, PNG) or PDFs · Max 10 files</p>
              <button onClick={() => fileInputRef.current?.click()} className="mt-4 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold cursor-pointer">
                Browse files
              </button>
            </div>

            {/* Selected files */}
            {files.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm">{files.length} file{files.length > 1 ? "s" : ""} selected</h3>
                  <button onClick={() => setFiles([])} className="text-xs text-muted-foreground hover:text-foreground cursor-pointer">Clear all</button>
                </div>
                {files.map((file, i) => (
                  <div key={`${file.name}-${i}`} className="flex items-center gap-3 px-4 py-3 rounded-md border border-border bg-card">
                    <div className="size-9 rounded-lg bg-primary/10 text-primary grid place-items-center">{getFileIcon(file)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{file.name}</div>
                      <div className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</div>
                    </div>
                    <button onClick={() => removeFile(i)} className="size-7 rounded-lg hover:bg-accent grid place-items-center cursor-pointer"><X className="size-3.5 text-muted-foreground" /></button>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={isHandwritten} onChange={(e) => setIsHandwritten(e.target.checked)} className="accent-primary size-4 rounded" />
                    <span className="text-sm text-muted-foreground">Handwritten content</span>
                  </label>
                  <button onClick={handleUpload} disabled={uploading} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold cursor-pointer disabled:opacity-60">
                    {uploading ? (
                      <><Loader2 className="size-4 animate-spin" /> Processing...</>
                    ) : (
                      <><Brain className="size-4" /> Extract {activeTab === "questions" ? "Questions" : activeTab === "rubrics" ? "Rubrics" : "Solutions"}</>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Feedback */}
            {uploadError && (
              <div className="px-4 py-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                <AlertTriangle className="size-4 shrink-0" /> {uploadError}
              </div>
            )}
            {uploadSuccess && (
              <div className="px-4 py-3 rounded-md bg-success/10 border border-success/20 text-success text-sm flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0" /> {uploadSuccess}
              </div>
            )}

            {/* Processing indicator */}
            {uploading && (
              <div className="p-5 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 rounded-md bg-primary/10 grid place-items-center"><Brain className="size-5 text-primary animate-pulse" /></div>
                  <div><div className="font-bold text-sm">AI is processing...</div><div className="text-xs text-muted-foreground">This may take 5–30 seconds</div></div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full bg-primary" initial={{ width: "5%" }} animate={{ width: "85%" }} transition={{ duration: 15, ease: "easeOut" }} />
                </div>
              </div>
            )}
          </div>

          {/* Right: Results panel */}
          <div className="space-y-4">
            {activeTab === "questions" ? (
              /* Questions panel */
              <>
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-bold text-lg">Extracted Questions</h2>
                  {questions.length > 0 && <span className="text-xs text-muted-foreground">{questions.length} questions</span>}
                </div>

                {loadingQuestions ? (
                  <div className="flex items-center justify-center py-12"><Loader2 className="size-5 animate-spin text-muted-foreground" /></div>
                ) : questions.length === 0 ? (
                  <div className="p-6 rounded-lg border border-dashed border-border text-center">
                    <FileText className="size-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No questions yet. Upload a question paper to extract with AI.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[calc(100vh-320px)] overflow-y-auto scrollbar-thin pr-1">
                    {questions.map((q) => (
                      <div key={q.id} className="p-4 rounded-md border border-border bg-card hover:border-primary/20 transition">
                        {editingQuestionId === q.id ? (
                          <div className="space-y-3">
                            <div className="grid grid-cols-[1fr_80px] gap-2">
                              <div><label className="text-[10px] font-medium text-muted-foreground uppercase">Label</label><input type="text" value={questionEditForm.question_label} onChange={(e) => setQuestionEditForm((p) => ({ ...p, question_label: e.target.value }))} className="mt-0.5 w-full px-2 py-1.5 rounded-lg border border-border bg-background text-sm outline-none focus:ring-1 focus:ring-ring" /></div>
                              <div><label className="text-[10px] font-medium text-muted-foreground uppercase">Marks</label><input type="number" value={questionEditForm.marks} onChange={(e) => setQuestionEditForm((p) => ({ ...p, marks: e.target.value }))} className="mt-0.5 w-full px-2 py-1.5 rounded-lg border border-border bg-background text-sm outline-none focus:ring-1 focus:ring-ring" /></div>
                            </div>
                            <div><label className="text-[10px] font-medium text-muted-foreground uppercase">Description</label><textarea value={questionEditForm.question_description} onChange={(e) => setQuestionEditForm((p) => ({ ...p, question_description: e.target.value }))} rows={3} className="mt-0.5 w-full px-2 py-1.5 rounded-lg border border-border bg-background text-sm outline-none focus:ring-1 focus:ring-ring resize-none" /></div>
                            <div className="flex gap-2 justify-end">
                              <button onClick={() => setEditingQuestionId(null)} className="px-3 py-1.5 rounded-lg border border-border text-xs hover:bg-accent cursor-pointer">Cancel</button>
                              <button onClick={handleQuestionEditSave} disabled={questionEditLoading} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium cursor-pointer disabled:opacity-60">{questionEditLoading ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" />} Save</button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-bold">{q.question_label}</span>
                                {q.marks != null && <span className="flex items-center gap-1 text-xs text-muted-foreground"><Hash className="size-3" /> {q.marks} marks</span>}
                              </div>
                              <button onClick={() => startEditQuestion(q)} className="size-7 rounded-lg hover:bg-accent grid place-items-center cursor-pointer opacity-60 hover:opacity-100 transition" title="Edit"><Pencil className="size-3.5 text-muted-foreground" /></button>
                            </div>
                            <p className="text-sm text-foreground/80 leading-relaxed">{q.question_description}</p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : activeTab === "rubrics" ? (
              /* Rubrics panel */
              <>
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-bold text-lg">Extracted Rubrics</h2>
                  {rubrics.length > 0 && <span className="text-xs text-muted-foreground">{rubrics.length} rubrics</span>}
                </div>

                {loadingRubrics ? (
                  <div className="flex items-center justify-center py-12"><Loader2 className="size-5 animate-spin text-muted-foreground" /></div>
                ) : rubrics.length === 0 ? (
                  <div className="p-6 rounded-lg border border-dashed border-border text-center">
                    <ClipboardList className="size-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No rubrics yet. Upload a rubric document to extract grading criteria with AI.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[calc(100vh-320px)] overflow-y-auto scrollbar-thin pr-1">
                    {rubrics.map((r) => (
                      <div key={r.id} className="p-4 rounded-md border border-border bg-card hover:border-primary/20 transition">
                        {editingRubricId === r.id ? (
                          <div className="space-y-3">
                            <div><label className="text-[10px] font-medium text-muted-foreground uppercase">Question Label</label><input type="text" value={rubricEditForm.question_label} onChange={(e) => setRubricEditForm((p) => ({ ...p, question_label: e.target.value }))} className="mt-0.5 w-full px-2 py-1.5 rounded-lg border border-border bg-background text-sm outline-none focus:ring-1 focus:ring-ring" /></div>
                            <div><label className="text-[10px] font-medium text-muted-foreground uppercase">Rubric Description (JSON)</label><textarea value={rubricEditForm.rubric_description} onChange={(e) => setRubricEditForm((p) => ({ ...p, rubric_description: e.target.value }))} rows={8} className="mt-0.5 w-full px-2 py-1.5 rounded-lg border border-border bg-background text-xs font-mono outline-none focus:ring-1 focus:ring-ring resize-none" /></div>
                            <div className="flex gap-2 justify-end">
                              <button onClick={() => setEditingRubricId(null)} className="px-3 py-1.5 rounded-lg border border-border text-xs hover:bg-accent cursor-pointer">Cancel</button>
                              <button onClick={handleRubricEditSave} disabled={rubricEditLoading} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium cursor-pointer disabled:opacity-60">{rubricEditLoading ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" />} Save</button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-bold">{r.question_label}</span>
                              <button onClick={() => startEditRubric(r)} className="size-7 rounded-lg hover:bg-accent grid place-items-center cursor-pointer opacity-60 hover:opacity-100 transition" title="Edit"><Pencil className="size-3.5 text-muted-foreground" /></button>
                            </div>
                            {r.rubric_description?.criteria && r.rubric_description.criteria.length > 0 && (
                              <div className="mb-3">
                                <div className="text-[10px] font-medium text-muted-foreground uppercase mb-1.5">Criteria</div>
                                <div className="space-y-1.5">
                                  {r.rubric_description.criteria.map((c, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm">
                                      <span className="shrink-0 px-1.5 py-0.5 rounded bg-success/10 text-success text-[10px] font-bold">+{c.points}</span>
                                      <span className="text-foreground/80">{c.description}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {r.rubric_description?.penalties && r.rubric_description.penalties.length > 0 && (
                              <div className="mb-3">
                                <div className="text-[10px] font-medium text-muted-foreground uppercase mb-1.5">Penalties</div>
                                <div className="space-y-1.5">
                                  {r.rubric_description.penalties.map((p, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm">
                                      <span className="shrink-0 px-1.5 py-0.5 rounded bg-destructive/10 text-destructive text-[10px] font-bold">{p.deduction}</span>
                                      <span className="text-foreground/80">{p.condition}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {r.rubric_description?.fatal_flaw && (
                              <div>
                                <div className="text-[10px] font-medium text-muted-foreground uppercase mb-1">Fatal Flaw</div>
                                <div className="text-sm text-destructive/80 italic">{r.rubric_description.fatal_flaw}</div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* Solutions panel */
              <>
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-bold text-lg">Extracted Solutions</h2>
                  {solutions.length > 0 && <span className="text-xs text-muted-foreground">{solutions.length} solutions</span>}
                </div>

                {loadingSolutions ? (
                  <div className="flex items-center justify-center py-12"><Loader2 className="size-5 animate-spin text-muted-foreground" /></div>
                ) : solutions.length === 0 ? (
                  <div className="p-6 rounded-lg border border-dashed border-border text-center">
                    <BookCheck className="size-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No solutions yet. Upload teacher solution documents to extract model answers with AI.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[calc(100vh-320px)] overflow-y-auto scrollbar-thin pr-1">
                    {solutions.map((s) => (
                      <div key={s.id} className="p-4 rounded-md border border-border bg-card hover:border-primary/20 transition">
                        {editingSolutionId === s.id ? (
                          <div className="space-y-3">
                            <div><label className="text-[10px] font-medium text-muted-foreground uppercase">Question Label</label><input type="text" value={solutionEditForm.question_label} onChange={(e) => setSolutionEditForm((p) => ({ ...p, question_label: e.target.value }))} className="mt-0.5 w-full px-2 py-1.5 rounded-lg border border-border bg-background text-sm outline-none focus:ring-1 focus:ring-ring" /></div>
                            <div><label className="text-[10px] font-medium text-muted-foreground uppercase">Solution Text</label><textarea value={solutionEditForm.solution_text} onChange={(e) => setSolutionEditForm((p) => ({ ...p, solution_text: e.target.value }))} rows={6} className="mt-0.5 w-full px-2 py-1.5 rounded-lg border border-border bg-background text-sm outline-none focus:ring-1 focus:ring-ring resize-none" /></div>
                            <div className="flex gap-2 justify-end">
                              <button onClick={() => setEditingSolutionId(null)} className="px-3 py-1.5 rounded-lg border border-border text-xs hover:bg-accent cursor-pointer">Cancel</button>
                              <button onClick={handleSolutionEditSave} disabled={solutionEditLoading} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium cursor-pointer disabled:opacity-60">{solutionEditLoading ? <Loader2 className="size-3 animate-spin" /> : <Check className="size-3" />} Save</button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <span className="px-2 py-0.5 rounded-md bg-secondary/20 text-secondary-foreground text-xs font-bold">{s.question_label}</span>
                              <button onClick={() => startEditSolution(s)} className="size-7 rounded-lg hover:bg-accent grid place-items-center cursor-pointer opacity-60 hover:opacity-100 transition" title="Edit"><Pencil className="size-3.5 text-muted-foreground" /></button>
                            </div>
                            <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{s.solution_text}</p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
