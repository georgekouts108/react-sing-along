import domCasualScreenshot from '../../assets/images/screenshots/fontExamples/ex_domcasuald.png'
import itcKorinnaScreenshot from '../../assets/images/screenshots/fontExamples/ex_itckorinna.png'
import muroScreenshot from '../../assets/images/screenshots/fontExamples/ex_muro.png'
import data70Screenshot from '../../assets/images/screenshots/fontExamples/ex_data70.png'
import sansmaticaScreenshot from '../../assets/images/screenshots/fontExamples/ex_sansmatica.png'

export const fonts = [
    {
        fid:'ff20e2f3-2a8d-426d-8f8e-f8da2fc2adf9',
        name:'Dom Casual D',
        wordSpacing: 1,
        recommendedSizePercentages: { 
            mixed: {oneLine: 0.16, twoLine:0.115},
            uppercase:{oneLine: 0.14, twoLine:0.104}
        },
        example: {
            screenshot: domCasualScreenshot,
            videoName: 'Crayola Presents: The Ugly Duckling - A Martin Gates Flim Sing-Along-Tunes (1997)'
        }
    },
    {
        fid:'80cd13e4-2ea2-4175-954b-dc1955eee1fc',
        name:'ITC Korinna Std',
        wordSpacing: 1,
        recommendedSizePercentages: { 
            mixed: {oneLine: 0.09375, twoLine:0.083},
            uppercase:{oneLine: 0.083, twoLine:0.079}
        },
        example: {
            screenshot: itcKorinnaScreenshot,
            videoName: 'Disney Sing-Along Songs: Friend Like Me (1993)'
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
        example: {
            screenshot: muroScreenshot,
            videoName: 'Disney Sing-Along Songs: Friend Like Me (1993)'
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
        example: {
            screenshot: sansmaticaScreenshot,
            videoName: "Screen Songs by Famous Studios - Short'nin' Bread (1948)"
        }
    },
    {
        fid:'f76eb950-aebc-4d53-b56c-2cf40480249f',
        name:'Data70',
        wordSpacing: 2,
        recommendedSizePercentages: { 
            mixed: {oneLine: 0.111, twoLine: 0.15},
            uppercase:{oneLine: 0.104, twoLine: 0.097}
        },
        example: {
            screenshot: data70Screenshot,
            videoName: 'Disney Sing-Along Songs: The Twelve Days of Christmas (1993)'
        }
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

