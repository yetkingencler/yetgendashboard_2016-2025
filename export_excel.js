const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

function processFile() {
    const filePath = path.join(process.cwd(), 'src', 'App.tsx');
    let content = fs.readFileSync(filePath, 'utf-8');

    const match = content.match(/const yearlyData: IYearlyData\[\] = (\[[\s\S]*?\n\]);\n\nconst genderData/);
    if (!match) {
        console.error("Could not find yearlyData");
        return;
    }

    let arrayString = match[1];
    let yearlyData;
    try {
        yearlyData = eval('(' + arrayString + ')');
    } catch (e) {
        console.error("Eval failed", e);
        return;
    }

    const overviewData = [];
    const programsData = [];
    const citiesData = [];
    const ageData = [];
    const eduData = [];
    const deptData = [];

    yearlyData.forEach(year => {
        overviewData.push({
            'Yıl': year.year,
            'Toplam Katılımcı': year.participants || 0,
            'Toplam Mezun': year.graduates || 0,
            'Kadın': year.gender?.female || 0,
            'Erkek': year.gender?.male || 0,
            'Diğer': year.gender?.other || 0
        });

        if (year.programs) {
            year.programs.forEach(p => {
                programsData.push({
                    'Yıl': year.year,
                    'Program Adı': p.name,
                    'Katılımcı': p.participants || 0,
                    'Mezun': p.graduates || 0,
                    'Kadın': p.gender?.female || 0,
                    'Erkek': p.gender?.male || 0,
                    'Diğer': p.gender?.other || 0
                });

                if (p.cities) {
                    p.cities.forEach(c => {
                        citiesData.push({
                            'Program': p.name,
                            'Şehir': c.name,
                            'Kişi Sayısı': c.count
                        });
                    });
                }

                if (p.ageData) {
                    p.ageData.forEach(a => {
                        ageData.push({
                            'Program': p.name,
                            'Yaş Grubu': a.age,
                            'Kişi Sayısı': a.count
                        });
                    });
                }

                if (p.educationLevels) {
                    p.educationLevels.forEach(e => {
                        eduData.push({
                            'Program': p.name,
                            'Eğitim Seviyesi': e.name,
                            'Kişi Sayısı': e.count
                        });
                    });
                }

                if (p.topDepartments) {
                    p.topDepartments.forEach(d => {
                        deptData.push({
                            'Program': p.name,
                            'Bölüm': d.name,
                            'Kişi Sayısı': d.val
                        });
                    });
                }
            });
        }
    });

    const wb = xlsx.utils.book_new();

    const wsOverview = xlsx.utils.json_to_sheet(overviewData);
    xlsx.utils.book_append_sheet(wb, wsOverview, "Yıllık Özet");

    const wsPrograms = xlsx.utils.json_to_sheet(programsData);
    xlsx.utils.book_append_sheet(wb, wsPrograms, "Eğitim Programları");

    const wsCities = xlsx.utils.json_to_sheet(citiesData);
    xlsx.utils.book_append_sheet(wb, wsCities, "Şehirler");

    const wsAge = xlsx.utils.json_to_sheet(ageData);
    xlsx.utils.book_append_sheet(wb, wsAge, "Yaş Dağılımı");

    const wsEdu = xlsx.utils.json_to_sheet(eduData);
    xlsx.utils.book_append_sheet(wb, wsEdu, "Eğitim Durumu");

    const wsDept = xlsx.utils.json_to_sheet(deptData);
    xlsx.utils.book_append_sheet(wb, wsDept, "Bölümler");

    const exportDir = path.join(process.cwd(), 'excel_export');
    if (!fs.existsSync(exportDir)) {
        fs.mkdirSync(exportDir);
    }

    const exportPath = path.join(exportDir, 'YetGen_Egitim_Verileri.xlsx');
    xlsx.writeFile(wb, exportPath);
    console.log("Excel file successfully created at: " + exportPath);
}

processFile();
