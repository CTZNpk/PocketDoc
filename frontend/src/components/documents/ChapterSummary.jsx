import { useEffect, useState, } from 'react'
import useSummary from '../../hooks/useSummary'
import DOMPurify from 'dompurify'
import { useParams } from 'react-router'

const ChapterSummaryViewer = () => {
  const { chapterId } = useParams();
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { generateChapterSummary } = useSummary()
  const preprocessSummary = (html) => {
    // Use a regular expression to insert <br/> after headings
    return html.replace(/<\/strong>/g, '</strong><br/>');
  }

  const processedSummary = preprocessSummary(summary)

  useEffect(() => {
    const fetchSummary = async () => {
      if (!chapterId) return

      try {
        setLoading(true)
        setError('')
        const htmlSummary = await generateChapterSummary(chapterId)
        setSummary(DOMPurify.sanitize(htmlSummary))
      } catch (err) {
        setError('Failed to load chapter summary')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-8 text-gray-100 mt-[8vh]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">
          Chapter Summary
        </h1>
        <div
          className="prose prose-invert prose-lg text-white"
          dangerouslySetInnerHTML={{ __html: processedSummary }}
          style={{
            '--tw-prose-headings': '#fff',
            '--tw-prose-body': '#d1d5db',
            '--tw-prose-links': '#60a5fa',
          }}
        >
        </div>
      </div>
    </div>
  )
}

export default ChapterSummaryViewer
