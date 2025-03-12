
async function fetchChangeLog() {
  const response = await fetch("https://backend.roaring.io/changelogs?type=API", {
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

function createTitle(item: any) {
  if (item.link) {
    return `[${item.title}](https://app.roaring.io/v2/developer/apis/${item.link})`
  } else {
    return item.title
  }
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
    let entry = `## ${createTitle(item)}\n\n### ${item.date}\n\n${item.description}\n\n`;
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
