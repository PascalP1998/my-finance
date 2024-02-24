import { Link } from 'react-router-dom';

export default function IndexPage() {
    return (
        <>
            <div className="mt-20 grow max-w-2xl mx-auto">
                <h1>Willkommen auf <em>My&nbsp;Finance</em></h1>
                <p className="bg-secondary p-4 rounded-md my-4">Hier kannst du, für jeden deiner Bank-Accounts, durchgeführte Transaktionen hinzufügen und <em>My Finance</em> wird dir einen Überblick über deine Ein- und Ausgaben geben.</p>
                <div className="bg-secondary p-4 rounded-md my-4 text-center">
                    <p>Gebaut mithilfe von:</p>
                    <ul className="mt-2 flex flex-row justify-evenly">
                        <li className="flex flex-row items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" className="w-10 h-10">
                                <title>React Logo</title>
                                <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
                                <g stroke="#61dafb" strokeWidth="1" fill="none">
                                    <ellipse rx="11" ry="4.2"/>
                                    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                                    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                                </g>
                            </svg>
                            <span>React</span>
                        </li>
                        <li className="flex flex-row items-center">
                            <span>Express.js</span>
                        </li>
                        <li className="flex flex-row items-center">
                            <svg className="w-10 h-10" height="2500" viewBox="8.738 -5.03622834 17.45992422 39.40619484" width="2500" xmlns="http://www.w3.org/2000/svg"><path d="m15.9.087.854 1.604c.192.296.4.558.645.802a22.406 22.406 0 0 1 2.004 2.266c1.447 1.9 2.423 4.01 3.12 6.292.418 1.394.645 2.824.662 4.27.07 4.323-1.412 8.035-4.4 11.12a12.7 12.7 0 0 1 -1.57 1.342c-.296 0-.436-.227-.558-.436a3.589 3.589 0 0 1 -.436-1.255c-.105-.523-.174-1.046-.14-1.586v-.244c-.024-.052-.285-24.052-.181-24.175z" fill="#599636"/><path d="m15.9.034c-.035-.07-.07-.017-.105.017.017.35-.105.662-.296.96-.21.296-.488.523-.767.767-1.55 1.342-2.77 2.963-3.747 4.776-1.3 2.44-1.97 5.055-2.16 7.808-.087.993.314 4.497.627 5.508.854 2.684 2.388 4.933 4.375 6.885.488.47 1.01.906 1.55 1.325.157 0 .174-.14.21-.244a4.78 4.78 0 0 0 .157-.68l.35-2.614z" fill="#6cac48"/><path d="m16.754 28.845c.035-.4.227-.732.436-1.063-.21-.087-.366-.26-.488-.453a3.235 3.235 0 0 1 -.26-.575c-.244-.732-.296-1.5-.366-2.248v-.453c-.087.07-.105.662-.105.75a17.37 17.37 0 0 1 -.314 2.353c-.052.314-.087.627-.28.906 0 .035 0 .07.017.122.314.924.4 1.865.453 2.824v.35c0 .418-.017.33.33.47.14.052.296.07.436.174.105 0 .122-.087.122-.157l-.052-.575v-1.604c-.017-.28.035-.558.07-.82z" fill="#c2bfbf"/></svg>
                            <span>MongoDB</span>
                        </li>
                    </ul>
                </div>
                <div className="bg-secondary p-4 rounded-md my-4 text-center flex flex-col items-center">
                    <div className="p-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                            <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span>Das ist ein Demo-Projekt, demnach werden aktuell keine neuen Nutzer registriert. Bitte <Link className="border-b-2 border-primary hover:text-primary hover:border-white" to={"/login"}>loggen Sie sich</Link>, wenn Sie die Demo ausprobieren möchten, mit folgenden Daten ein:</span>
                    <ul className="list-disc text-left">
                        <li>E-Mail: max.mustermann@email.com</li>
                        <li>Passwort: 1234</li>
                    </ul>
                </div>
            </div>
        </>
    )
}