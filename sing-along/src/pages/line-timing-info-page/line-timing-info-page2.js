import React, {useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

function LineTimingInfoPage2() {
    const navigate = useNavigate();
    const location = useLocation();

    // const [timestampTypeInProgress, setTimestampTypeInProgress] = useState('sing')

    const data = location.state?.data;
    const stamps =[];
    for (let s = 0; s < data.lines.length; s++) {
        stamps.push({
            lineId: data.lines[s].id,
            textShown: data.lines[s].textShown,
            textHeard: data.lines[s].textHeard,
            singTime:'TBD',
            exitTime:'TBD'
        })
    }
    
    let current_lyric_id = 1;
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let formattedTime = "00:00:00.000";

    const setButtonEnabledStatus = (element_id, disabled) => {
        const btn = document.getElementById(element_id)
        if (btn) {
            btn.disabled = disabled
        }
    }

    const timestampToMillis = (stamp) => {
        let s_split = stamp.split('.')
        let s_ms = parseInt( s_split[1]), hms = s_split[0]
        let hms_split = hms.split(':')
        let h = parseInt(hms_split[0]), m = parseInt(hms_split[1]), s = parseInt(hms_split[2])
        let ms = s_ms + (s * 1000) + (m * 60 * 1000) + (h * 60 * 60 * 1000)

        return ms
    }
    
    const addTimestamps = (stamp1, stamp2) => {
        let ms1 = 0, ms2 = 0

        let s1_split = stamp1.split('.')
        let s1_ms = parseInt( s1_split[1]), hms1 = s1_split[0]
        let hms1_split = hms1.split(':')
        let h1 = parseInt(hms1_split[0]), m1 = parseInt(hms1_split[1]), s1 = parseInt(hms1_split[2])
        ms1 = s1_ms + (s1 * 1000) + (m1 * 60 * 1000) + (h1 * 60 * 60 * 1000)

        let s2_split = stamp2.split('.')
        let s2_ms = parseInt( s2_split[1]), hms2 = s2_split[0]
        let hms2_split = hms2.split(':')
        let h2 = parseInt(hms2_split[0]), m2 = parseInt(hms2_split[1]), s2 = parseInt(hms2_split[2])
        ms2 = s2_ms + (s2 * 1000) + (m2 * 60 * 1000) + (h2 * 60 * 60 * 1000)

        let total_ms = ms1 + ms2

        let hrs = Math.floor(total_ms / 3600000);
        let mins = Math.floor((total_ms % 3600000) / 60000);
        let sec = Math.floor((total_ms % 60000) / 1000);
        let millis = total_ms % 1000;

        return "\'"+  pad(hrs, 1)+":"+pad(mins, 2)+":" +pad(sec, 2)+"."+pad(millis, 3)+"\'"
    }

    const restartSingTimes = () => {
        current_lyric_id = 1
        reportNextLyric()
        clearInterval(timerInterval);
        timerInterval = null;
        
        const displayElement = document.getElementById("display");
        if (displayElement) {
            displayElement.textContent = "00:00:00.000";
        }

        elapsedTime = 0;
        setButtonEnabledStatus('prep_for_exit_times', true)
        setButtonEnabledStatus('sing_time_saver', false)

        for (let s = 0; s < stamps.length; s++) {
            stamps[s].singTime='TBD'
        }
    }

    const restartExitTimes = () => {
        current_lyric_id = 1
        reportNextLyric()
        clearInterval(timerInterval);
        timerInterval = null;

        const displayElement = document.getElementById("display");
        if (displayElement) {
            displayElement.textContent = "00:00:00.000";
        }

        elapsedTime = 0;
        setButtonEnabledStatus('exit_time_restart', false)
        setButtonEnabledStatus('exit_time_saver', false)

        for (let s = 0; s < stamps.length; s++) {
            stamps[s].exitTime='TBD'
        }
    }

    const prepForExitTimes = () => {

        stamps[0].singTime = '00:00:00.000'
        console.log(stamps)
        setButtonEnabledStatus('sing_time_saver', true)
        setButtonEnabledStatus('exit_time_saver', false)
        setButtonEnabledStatus('prep_for_exit_times', true)
        setButtonEnabledStatus('sing_time_restart', true)
        setButtonEnabledStatus('exit_time_restart', false)
        
        current_lyric_id = 1
        reportNextLyric()
        
        let x = document.getElementById('stamp_type')
        if (x) {
            x.textContent = "Now doing: EXIT_TIME Timestamps"
        }

        clearInterval(timerInterval);
        timerInterval = null;
        const displayElement = document.getElementById("display");
        if (displayElement) {
            displayElement.textContent = "00:00:00.000";
        }

        elapsedTime = 0;
    }

    const finish = () => {
        clearInterval(timerInterval);
        setButtonEnabledStatus('save_stamps', false)
        setButtonEnabledStatus('exit_time_restart', true)
    }

    const reportNextLyric = () =>  {
        const h = document.getElementById('next_lyric_id');
        if (h) {
            h.textContent = (current_lyric_id - 1) + " / " + (stamps.length - 1);
        }

        const i = document.getElementById('next_lyric_text_shown');
        if (i) {
            i.textContent = stamps[current_lyric_id - 1].textShown;
        }

        const j = document.getElementById('next_lyric_text_sung');
        if (j) {
            j.textContent = stamps[current_lyric_id - 1].textHeard;
        }
    }

    const recordExitTime = ()  => {

        let before_singtime_of_next;
        let after_singtime_of_current;

        if (timerInterval) {
            if (current_lyric_id === stamps.length) {
                stamps[current_lyric_id - 1].exitTime = formattedTime
                current_lyric_id++;
            } else {
                console.log(stamps[current_lyric_id-1].singTime)
                console.log("formatted time = "+formattedTime)
                console.log(stamps[current_lyric_id].singTime)

                before_singtime_of_next = timestampToMillis(formattedTime) <= timestampToMillis(stamps[current_lyric_id].singTime)
                after_singtime_of_current = timestampToMillis(formattedTime) > timestampToMillis(stamps[current_lyric_id - 1].singTime)

                
                if (before_singtime_of_next && after_singtime_of_current) {
                    stamps[current_lyric_id - 1].exitTime = formattedTime
                    current_lyric_id++;
                } else {
                    alert("EXIT TIME NO GOOD");
                    restartExitTimes();
                }
            }
        } else {
            startTime = new Date() - elapsedTime;
            timerInterval = setInterval(updateDisplay, 10);
        }
        
        if (current_lyric_id > stamps.length) {
            clearInterval(timerInterval);
            setButtonEnabledStatus('exit_time_saver',true)
            setButtonEnabledStatus('finish_btn',false)
        }
        else {
            reportNextLyric()
        }
    }

    const recordSingTime = () => {
    
        if (timerInterval) {
            stamps[current_lyric_id - 1].singTime = formattedTime;
            current_lyric_id++;
        } else {
            startTime = new Date() - elapsedTime;
            stamps[current_lyric_id - 1].singTime = formatTime(elapsedTime);
            current_lyric_id++;
            timerInterval = setInterval(updateDisplay, 10);  // Update every 10 ms
        }
    
        if (current_lyric_id > stamps.length) {
            setButtonEnabledStatus('sing_time_saver', true);
            setButtonEnabledStatus('prep_for_exit_times', false);
        } else {
            reportNextLyric();
        }
    }
    
    const updateDisplay = () => {
        const elapsedTime = new Date() - startTime;
        formattedTime = formatTime(elapsedTime);
        
        const displayElement = document.getElementById("display");
        if (displayElement) {
            displayElement.textContent = formattedTime;
        } else {
            console.error("Display element not found");
        }
    }
    
    const formatTime = (time) => {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = time % 1000;

        return (
            pad(hours, 2)+":"+pad(minutes, 2)+":" +pad(seconds, 2)+"."+pad(milliseconds, 3)
        );
    }

    const pad = (number, length) => {
        return ("0" + number).slice(-length);
    }

    const confirmAllTimestamps = () => {
        const finalLinesInfo = data.lines;
        
        var sing_time_1 = document.getElementById('sing_time_1').value;
        for (let s = 0; s < stamps.length; s++) {
            stamps[s].singTime = addTimestamps(stamps[s].singTime, sing_time_1)
            stamps[s].exitTime = addTimestamps(stamps[s].exitTime, sing_time_1)
            finalLinesInfo[s].singTime = stamps[s].singTime;
            finalLinesInfo[s].exitTime = stamps[s].exitTime;
        }
        
        data.lines = finalLinesInfo;
        console.log("🎊 FINAL DATA: ")
        console.log(data)

        // navigate('/lyric-styles', { 
        //     state: {
        //         lines:stamps
        //     }
        // });
    }

    useEffect(() => {
        reportNextLyric();
        setButtonEnabledStatus('sing_time_saver', false);
    }, []);

    return (
        <div>
            <h1>LYRIC TIMING</h1>
            <hr/>
            <h2 id="stamp_type">Now doing: SING_TIME Timestamps</h2>
            <table style={{border: '3px solid black', textAlign: 'center'}}>
                <tbody>
                    <tr>
                        <td style={{border: '3px solid black'}}>
                            <h2>Next Line ID</h2>
                        </td>
                        <td style={{border: '3px solid black'}}>
                            <h2 id="next_lyric_id" style={{color: 'blueviolet'}}></h2>
                        </td>
                    </tr>
                    <tr>
                        <td style={{border: '3px solid black'}}>
                            <h2>Text Shown</h2>
                        </td>
                        <td style={{border: '3px solid black'}}>
                            <h2 id="next_lyric_text_shown" style={{color: 'darkcyan', fontStyle: 'italic'}}></h2>
                        </td>
                    </tr>
                    <tr>
                        <td style={{border: '3px solid black'}}>
                            <h2>Text Heard</h2>
                        </td>
                        <td style={{border: '3px solid black'}}>
                            <h2 id="next_lyric_text_sung" style={{color: 'darkred', fontStyle: 'italic'}}></h2>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br/>
    
            <div id="display" style={{fontSize: 50, fontFamily: 'monospace'}}>00:00:00.000</div><br/>
            
            <div>
                <button id="sing_time_saver" onClick={recordSingTime}>Start timer / Record SING_TIME</button>
                <button id="sing_time_restart" onClick={restartSingTimes}>Restart SING_TIMEs</button><br/><br/>
                <button id="prep_for_exit_times" onClick={prepForExitTimes}>Save SING timestamps</button><br/><br/>
            </div>
        
            <div>
                <button id="exit_time_saver" onClick={recordExitTime}>Start timer / Record EXIT_TIME</button>
                <button id="exit_time_restart" onClick={restartExitTimes}>Restart EXIT_TIMEs</button><br/><br/>
            </div>
            
            <button id="finish_btn" onClick={finish}>Finish</button><br/><br/>
    
            <label>Enter the actual SING_TIME of the 1st Line in the media:</label>
            <input required placeholder="00:00:00.000" type="text" id="sing_time_1" name="string1"/>
            <div>
                <button id="save_stamps" onClick={confirmAllTimestamps}>Confirm All Timestamps</button>
            </div>
        </div>
    );
    
}

export default LineTimingInfoPage2;