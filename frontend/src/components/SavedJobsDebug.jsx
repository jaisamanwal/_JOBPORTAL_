import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const SavedJobsDebug = () => {
    const { savedJobs } = useSelector(store => store.job);

    useEffect(() => {
        console.log('=== SAVED JOBS DEBUG ===');
        console.log('savedJobs from Redux:', savedJobs);
        console.log('savedJobs length:', savedJobs?.length);
        console.log('savedJobs array:', JSON.stringify(savedJobs, null, 2));

        // Check localStorage
        const persistRoot = localStorage.getItem('persist:root');
        if (persistRoot) {
            console.log('persist:root from localStorage:', persistRoot);
            try {
                const parsed = JSON.parse(persistRoot);
                console.log('Parsed persist:root:', parsed);
                if (parsed.job) {
                    const jobState = JSON.parse(parsed.job);
                    console.log('Job state from persist:', jobState);
                    console.log('savedJobs from persist:', jobState.savedJobs);
                }
            } catch (e) {
                console.error('Error parsing persist:root:', e);
            }
        } else {
            console.log('No persist:root found in localStorage');
        }
    }, [savedJobs]);

    return (
        <div style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            background: 'black',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
            maxWidth: '300px',
            zIndex: 9999
        }}>
            <div><strong>Saved Jobs Count:</strong> {savedJobs?.length || 0}</div>
            <div><strong>Jobs:</strong></div>
            <div style={{ maxHeight: '200px', overflow: 'auto' }}>
                {savedJobs?.map((job, idx) => (
                    <div key={idx}>• {job?.title}</div>
                ))}
            </div>
        </div>
    )
}

export default SavedJobsDebug
