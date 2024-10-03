import domCasualScreenshot1 from '../../assets/images/screenshots/fontExamples/ex1_domcasuald.png'
import domCasualScreenshot2 from '../../assets/images/screenshots/fontExamples/ex2_domcasuald.png'
import itcKorinnaScreenshot1 from '../../assets/images/screenshots/fontExamples/ex1_itckorinna.png'
import itcKorinnaScreenshot2 from '../../assets/images/screenshots/fontExamples/ex2_itckorinna.png'
import muroScreenshot1 from '../../assets/images/screenshots/fontExamples/ex1_muro.png'
import muroScreenshot2 from '../../assets/images/screenshots/fontExamples/ex2_muro.png'
import data70Screenshot1 from '../../assets/images/screenshots/fontExamples/ex1_data70.png'
import data70Screenshot2 from '../../assets/images/screenshots/fontExamples/ex2_data70.png'
import sansmaticaScreenshot1 from '../../assets/images/screenshots/fontExamples/ex1_sansmatica.png'
import sansmaticaScreenshot2 from '../../assets/images/screenshots/fontExamples/ex2_sansmatica.png'
import greyhoundScreenshot1 from '../../assets/images/screenshots/fontExamples/ex1_greyhound.png'
import greyhoundScreenshot2 from '../../assets/images/screenshots/fontExamples/ex2_greyhound.png'

export const fonts = [
    {
        fid:'80cd13e4-2ea2-4175-954b-dc1955eee1fc',
        name:'ITC Korinna Std',
        wordSpacing: 1,
        recommendedSizePercentages: { 
            mixed: {oneLine: 0.09375, twoLine:0.083},
            uppercase:{oneLine: 0.083, twoLine:0.079}
        },
        example1: {
            screenshot: itcKorinnaScreenshot1,
            videoName: "Disney's Sing-Along Songs: Friend Like Me (1993)"
        },
        example2: {
            screenshot: itcKorinnaScreenshot2,
            videoName: "Disney's Sing-Along Songs: You Can Fly! (1988)"
        }

    },
    {
        fid:'ff20e2f3-2a8d-426d-8f8e-f8da2fc2adf9',
        name:'Dom Casual D',
        wordSpacing: 1,
        recommendedSizePercentages: { 
            mixed: {oneLine: 0.16, twoLine:0.115},
            uppercase:{oneLine: 0.14, twoLine:0.104}
        },
        example1: {
            screenshot: domCasualScreenshot1,
            videoName: 'Crayola Presents: The Ugly Duckling - A Martin Gates Flim Sing-Along-Tunes (1997)'
        },
        example2: {
            screenshot: domCasualScreenshot2,
            videoName: 'Alvin & The Chipmunks Sing-Alongs - Ragtime Cowboy Joe (1993)'
        }
    },
    {
        fid:'c0c43bef-b9b3-4ae7-b326-58e7fc941d09',
        name:'Muro',
        wordSpacing: 2,
        recommendedSizePercentages: { 
            mixed:{oneLine: 0.083, twoLine:0.076},
            uppercase:{oneLine: 0.083, twoLine:0.076}
        },
        example1: {
            screenshot: muroScreenshot1,
            videoName: "Disney's Sing-Along Songs: Friend Like Me (1993)"
        },
        example2: {
            screenshot: muroScreenshot2,
            videoName: "Disney's Sing-Along Songs: Circle of Life (1994)"
        }
    },
    {
        fid:'b3574739-8013-4c37-9b2f-478e4c693886',
        name:'Sansmatica',
        wordSpacing: 2,
        recommendedSizePercentages: { 
            mixed: {oneLine: 0.118, twoLine:0.094},
            uppercase: {oneLine: 0.097, twoLine:0.094}
        },
        example1: {
            screenshot: sansmaticaScreenshot1,
            videoName: "Screen Songs by Famous Studios - Short'nin' Bread (1948)"
        },
        example2: {
            screenshot: sansmaticaScreenshot2,
            videoName: "Screen Songs by Famous Studios - Snow Foolin' (1949)"
        },
    },
    {
        fid:'f76eb950-aebc-4d53-b56c-2cf40480249f',
        name:'Data70',
        wordSpacing: 2,
        recommendedSizePercentages: { 
            mixed: {oneLine: 0.111, twoLine: 0.15},
            uppercase:{oneLine: 0.104, twoLine: 0.097}
        },
        example1: {
            screenshot: data70Screenshot1,
            videoName: "Disney's Sing-Along Songs: The Twelve Days of Christmas (1993)"
        },
        example2: {
            screenshot: data70Screenshot2,
            videoName: "Dr. Seuss: The Hoober-Bloob Highway (1994)"
        },
    },
    {
        fid:'26ca3a1b-fe16-4388-8ee4-21c6375bd5fb',
        name:'Greyhound',
        wordSpacing: 2,
        recommendedSizePercentages: { // tweak this...
            mixed: {oneLine: 0.111, twoLine: 0.15},
            uppercase:{oneLine: 0.104, twoLine: 0.097}
        },
        example1: {
            screenshot: greyhoundScreenshot1,
            videoName: "Disney's Sing-Along Songs: Friend Like Me (1993)"
        },
        example2: {
            screenshot: greyhoundScreenshot2,
            videoName: "Disney's Sing-Along Songs: The Twelve Days of Christmas (1993)"
        },
    },
    {
        fid:'other',
        name:'Other Font',
        wordSpacing: 1,
        recommendedSizePercentages: { 
            mixed: {oneLine: 0, twoLine:0},
            uppercase:{oneLine: 0, twoLine:0} // these are dummy values
        }
    },
]

