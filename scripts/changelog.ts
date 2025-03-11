
async function fetchChangeLog() {
  const response = await fetch("https://backend.roaring.io/changelogs?type=API&type=DEFAULT&type=WEB", {
    headers: {
      "Accept": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const res = await response.json();
  const changeLog = res.properties.elements;
  return changeLog;
}

type Item = {
  date: string;
  title: string;
  description: string;
  link?: string;
}

function toMarkdown(data: any) {
  const items: Item[] = data.map((item: any) => {
    return {
      date: item.properties.changeLogAt,
      title: item.properties.details.title,
      description: item.properties.details.description,
      link: item.properties.details.linkUrl,
    };
  });

  const markdown = items.map((item) => {
    let entry = `## ${item.title}\n\n### ${item.date}\n\n${item.description}\n\n`;
    if (item.link) {
      const link = item.link.split("/").pop();
      entry += `<a href="https://app.roaring.io/v2/developer/apis/${link}" target="_blank">API Docs</a>\n\n`;
    }
    return entry;
  });
  const changelog = `# Changelog\n\n${markdown.join("\n")}`;

  return changelog;
}

fetchChangeLog().then((data) => {
  console.log(
    toMarkdown(data)
  );
});
