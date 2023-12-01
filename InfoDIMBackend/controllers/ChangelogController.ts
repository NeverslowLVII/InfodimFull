import { Request, Response } from 'express';
import { ChangelogModel } from '../models/Changelog';

export default {
  createChangelog: async (req: Request, res: Response) => {
    console.log("Création d'un changelog avec les données:", req.body);
    const changelog = new ChangelogModel(req.body);
    await changelog.save();
    console.log("Changelog sauvegardé:", changelog);
    res.status(201).json(changelog);
  },
  getChangelogs: async (req: Request, res: Response) => {
    console.log("Récupération des changelogs...");
    const changelogs = await ChangelogModel.find().sort({ timestamp: -1 });
    console.log("Changelogs récupérés:", changelogs);
    res.status(200).json(changelogs);
  },
}